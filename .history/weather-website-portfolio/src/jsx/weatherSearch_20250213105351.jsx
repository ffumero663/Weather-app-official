import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Ensure useNavigate is also imported
import "../css/weather-search.css";


function WeatherSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Add navigation

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
      const apiKey = "605e4cd6a27bd010207c1df8c2774b40"; // Replace with your valid API key
      const endpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`;

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

    // ✅ Navigate to `/details` and pass lat/lon in state
    navigate("/details", { state: { lat: suggestion.lat, lon: suggestion.lon } });
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
    </div>
  );
}

export default WeatherSearch;
