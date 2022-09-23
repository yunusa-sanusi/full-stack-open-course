import { useState, useEffect } from 'react';
import axios from 'axios';

import Weather from './Weather';

const Country = (props) => {
  const { name, capital, languages, area, flags } = props.country;
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`,
      )
      .then((response) => setWeatherData([response.data]));
  }, [capital]);

  const languageKeys = Object.keys(languages);
  return (
    <div>
      <h1>{name.common}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>

      <h3>languages</h3>
      <ul>
        {languageKeys.map((key) => {
          return <li key={key}>{languages[key]}</li>;
        })}
      </ul>
      <img src={flags.png} alt={`${name.common} flag`} />

      {weatherData.length && (
        <Weather weatherData={weatherData} capital={capital} />
      )}
    </div>
  );
};

export default Country;
