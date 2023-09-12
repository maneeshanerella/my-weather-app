import React, { useState, useEffect } from 'react';
import './WeatherComponent.css'; // Import the CSS file

const WeatherComponent = () => {
  // Define an array of cities for the dropdown select
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Seattle'];
  
  // State variables
  const [selectedCity, setSelectedCity] = useState(''); // Store the selected city
  const [weatherData, setWeatherData] = useState(null); // Store weather data
  const [unit, setUnit] = useState('C'); // Store the selected temperature unit ('C' or 'F')

  // useEffect hook: Fetch weather data when selectedCity or unit changes
  useEffect(() => {
    if (selectedCity) {
      // Call the fetchWeatherData function with the selected city
      fetchWeatherData(selectedCity);
    }
  }, [selectedCity, unit]); // Dependency array ensures the effect runs when these variables change

  // Function to fetch weather data from the API
  const fetchWeatherData = async (city) => {
    try {
      // Make a fetch request to the WeatherAPI using the selected city
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=1c1d743650b24443b9a205024231308&q=${city}`
      );
      // Parse the JSON response and store it in the weatherData state
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Render the component's JSX
  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      {/* Dropdown select for choosing a city */}
      <label htmlFor="city-select">Select a city:</label>
      <select
        id="city-select"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="">Select a city</option>
        {/* Map over the cities array to generate options */}
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {/* Radio buttons for selecting temperature unit */}
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
      {/* Display weather details if available */}
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
