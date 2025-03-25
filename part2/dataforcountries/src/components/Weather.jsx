const Weather = ({ weather }) => {
  if (!weather) {
    return <div>Unable to load weather data. Please try again later.</div>;
  }
  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather icon" />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;