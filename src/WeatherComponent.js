import React, { useState, useEffect } from 'react';
import './WeatherComponent.css'; // Import the CSS file


const WeatherComponent = () => {
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Seattle'];
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('C');

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity);
    }
  }, [selectedCity,unit]);

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=1c1d743650b24443b9a205024231308&q=${city}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <label htmlFor="city-select">Select a city:</label>
      <select
        id="city-select"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <div className="unit-radio">
        <label>
          <input
            type="radio"
            name="unit"
            value="C"
            checked={unit === 'C'}
            onChange={() => setUnit('C')}
          />
          Celsius (°C)
        </label>
        <label>
          <input
            type="radio"
            name="unit"
            value="F"
            checked={unit === 'F'}
            onChange={() => setUnit('F')}
          />
          Fahrenheit (°F)
        </label>
      </div>
      {weatherData && (
        <div className="weather-details">
          <h2>Weather Details for {weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c} °C</p>
          <p>Feels Like: {weatherData.current.feelslike_c} °C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
