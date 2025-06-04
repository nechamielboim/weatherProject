import React, { useEffect, useState } from "react";
import '../weather.css'

const API_KEY = "8ee633956bad6ae1965b557a94ecfcba";

const cities = [
  { name: "אילת", query: "Eilat" },
  { name: "לונדון", query: "London" },
  { name: "ניו יורק", query: "New York" },
  { name: "אלסקה", query: "Alaska" },
];

export default function WeatherCard() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const results = [];

      for (let city of cities) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.query}&appid=${API_KEY}&units=metric&lang=he`
        );
        const data = await response.json();

        results.push({
          name: city.name,
          description: data.weather[0].description,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
        });
      }

      setWeatherData(results);
    };

    fetchWeather();
  }, []);

  return (
    <div className="weather-container">
      {weatherData.map((city, index) => (
        <div key={index} className="weather-card">
          <h3>{city.name}</h3>
          <p>{city.description}</p>
          <p>🌡 טמפ' נמדדת: {city.temp}°C</p>
          <p>🧍 טמפ' מורגשת: {city.feels_like}°C</p>
          <p>💧 לחות: {city.humidity}%</p>
        </div>
      ))}
    </div>
  )
    }