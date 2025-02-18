import "../css/weather-search.css";
import React, { useState, useCallback } from "react";

function WeatherSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [savedCities, setSavedCities] = useState([]); // ✅ Stores saved cities

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = useCallback(
    debounce(async (input) => {
      if (!input) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      const apiKey = "605e4cd6a27bd010207c1df8c2774b40";
      const endpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=10&appid=${apiKey}`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const citySuggestions = data.map((city) => ({
          name: city.name,
          country: city.country,
          lat: city.lat,
          lon: city.lon,
        }));
        setSuggestions(citySuggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleInputChange = (event) => {
    const input = event.target.value;
    setQuery(input);
    fetchSuggestions(input);
  };

  const handleSuggestionClick = async (suggestion) => {
    setQuery(`${suggestion.name}, ${suggestion.country}`);
    setSuggestions([]);

    const apiKey = "605e4cd6a27bd010207c1df8c2774b40";
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${suggestion.lat}&lon=${suggestion.lon}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log("Weather Data:", data);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleClear = () => {
    setQuery("");
    setWeatherData(null);
    setSuggestions([]);
  };

  const handleSave = () => {
    if (weatherData && !savedCities.some(city => city.name === weatherData.name)) {
      setSavedCities([...savedCities, weatherData]);
    }
  };

  return (
    <div className="weather-search">
      <input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
      {loading && <div className="loading-spinner">Loading...</div>}
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="suggestion-item"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.name}, {suggestion.country}
          </li>
        ))}
      </ul>

      {/* Buttons for Clear & Save */}
      {weatherData && (
        <div className="buttons">
          <button onClick={handleClear} className="clear-btn">Clear</button>
          <button onClick={handleSave} className="save-btn">Save</button>
        </div>
      )}

      {/* Weather Details */}
      {weatherData && weatherData.main ? (
        <div className="weather-details">
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Feels Like: {weatherData.main.feels_like}°C</p>
          <p>Min Temp: {weatherData.main.temp_min}°C</p>
          <p>Max Temp: {weatherData.main.temp_max}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          <p>Sunrise: {weatherData.sys?.sunrise ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString() : "N/A"}</p>
          <p>Sunset: {weatherData.sys?.sunset ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString() : "N/A"}</p>

          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            className="weather-image"
          />
        </div>
      ) : weatherData && weatherData.cod === 401 ? (
        <p>Invalid API Key. Please check your API configuration.</p>
      ) : null}

      {/* Saved Cities Section */}
      {savedCities.length > 0 && (
        <div className="saved-cities">
          <h2>Saved Cities</h2>
          <div className="cities-grid">
            {savedCities.map((city, index) => (
              <div key={index} className="city-card">
                <h3>{city.name}</h3>
                <p>{city.main.temp}°C</p>
                <p>Feels Like: {weatherData.main.feels_like}°C</p>
          <p>Min Temp: {weatherData.main.temp_min}°C</p>
          <p>Max Temp: {weatherData.main.temp_max}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Condition: {weatherData.weather[0].description}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                  alt={city.weather[0].description}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherSearch;
