import { useState, useEffect } from 'react';
import axios from 'axios';

import Countries from './components/Countries';
import Country from './components/Country';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(true);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data));
  }, []);

  useEffect(() => {
    const newCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchText),
    );
    setFilteredCountries(newCountries);
    setShowSuggestion(true);

    if (searchText.length === 0) {
      setSuggestion('');
    }
  }, [countries, searchText]);

  const addSuggestion = () => {
    if (filteredCountries.length > 10) {
      setSuggestion('Too many matches, specify another filter');
    }
  };

  const handleSearchInput = (e) => {
    const convertToLower = e.target.value.toLowerCase();
    setSearchText(convertToLower);
    addSuggestion();
  };

  return (
    <div>
      <div>
        find countries <input type="search" onChange={handleSearchInput} />
      </div>

      <div>
        {filteredCountries.length === 1 ? (
          <Country country={filteredCountries[0]} />
        ) : filteredCountries.length > 1 && filteredCountries.length <= 10 ? (
          <Countries countries={filteredCountries} />
        ) : (
          showSuggestion && <p>{suggestion}</p>
        )}
      </div>
    </div>
  );
};

export default App;
