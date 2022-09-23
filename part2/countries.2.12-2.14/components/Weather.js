import React from 'react';

const Weather = (props) => {
  const { weatherData, capital } = props;

  const { temp } = weatherData[0].main;
  const { main: weather, icon } = weatherData[0].weather[0];
  const { speed: windSpeed } = weatherData[0].wind;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature {temp} Celsius</p>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={weather}
      />
      <p>wind {windSpeed} m/s</p>
    </div>
  );
};

export default Weather;
