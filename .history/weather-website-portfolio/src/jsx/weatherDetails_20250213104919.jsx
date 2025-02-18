
import "../css/weather-details.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function WeatherDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Location State:", location.state);

    

  const fetchWeatherData = async (lat, lon) => {
    const apiKey = "605e4cd6a27bd010207c1df8c2774b40";
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log("Fetched Weather Data:", data);

      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        console.error("Weather API Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-details">
      <h1>hello</h1>
    </div>
      
        
  );
}

export default WeatherDetails;


