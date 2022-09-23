import { useState } from 'react';
import Country from './Country';

const Countries = (props) => {
  const { countries } = props;
  const [countryToShow, setCountryToShow] = useState({ name: { common: '' } });

  const handleClick = (countryName) => {
    const country = countries.find(
      (country) => country.name.common === countryName,
    );
    setCountryToShow(country);
  };

  return (
    <div>
      {countries.map((country) => {
        const countryName = country.name.common;
        return (
          <div key={countryName}>
            {countryName}
            <button onClick={() => handleClick(countryName)}>show</button>
            {countryToShow.name.common === countryName ? (
              <Country country={countryToShow} />
            ) : (
              ''
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Countries;
