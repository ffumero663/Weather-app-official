import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import 

function WeatherDetails() {
  const location = useLocation(); // Get passed state
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (location.state) {
      const { lat, lon } = location.state;
      fetchWeatherData(lat, lon); // Fetch weather data for the selected city
    }
  }, [location.state]);

  const fetchWeatherData = async (lat, lon) => {
    const apiKey = "605e4cd6a27bd010207c1df8c2774b40";
    const endpoint = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setWeatherData(data); // Store weather details
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="weather-details">
      {weatherData ? (
        <div>
          <h1>{weatherData.name}</h1>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Condition: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default WeatherDetails;

