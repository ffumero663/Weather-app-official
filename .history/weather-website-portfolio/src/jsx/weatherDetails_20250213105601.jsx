import "../css/weather-details.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function WeatherDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("WeatherDetails component mounted");
    
    if (location.state?.lat && location.state?.lon) {
      fetchWeatherData(location.state.lat, location.state.lon);
    } else {
      console.warn("No location data found. Redirecting...");
      navigate("/"); // Redirect to home if no data
    }
  }, [location.state, navigate]);

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
      {loading ? (
        <p>Loading weather data...</p>
      ) : weatherData ? (
        <div>
          <h1>{weatherData.name}, {weatherData.sys?.country}</h1>
          <p>Temperature: {weatherData.main?.temp}°C</p>
          <p>Feels Like: {weatherData.main?.feels_like}°C</p>
          <p>Min Temp: {weatherData.main?.temp_min}°C</p>
          <p>Max Temp: {weatherData.main?.temp_max}°C</p>
          <p>Humidity: {weatherData.main?.humidity}%</p>
          <p>Pressure: {weatherData.main?.pressure} hPa</p>
          <p>Visibility: {weatherData.visibility ? weatherData.visibility / 1000 : "N/A"} km</p>
          <p>Wind Speed: {weatherData.wind?.speed} m/s</p>
          <p>Wind Direction: {weatherData.wind?.deg}°</p>
          <p>Cloudiness: {weatherData.clouds?.all}%</p>
          <p>Condition: {weatherData.weather?.[0]?.description}</p>
          <p>Sunrise: {weatherData.sys?.sunrise ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString() : "N/A"}</p>
          <p>Sunset: {weatherData.sys?.sunset ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString() : "N/A"}</p>

          {/* Weather Icon */}
          {weatherData.weather?.[0]?.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather?.[0]?.description}
            />
          )}
        </div>
      ) : (
        <p>Weather data not available.</p>
      )}
    </div>
  );
}

export default WeatherDetails;



