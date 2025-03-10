import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Navegacion from "../src/components/navegacion";
import PiePag from "../src/components/piePag";
import Home from "../src/pages/home";


function App() {
  return (

    <Router>
      <Navegacion />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyecto" element={<Home />} />
      </Routes>
      <PiePag />
    </Router>
  )
}



export default App;

/*
const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "7aa3fe57771492099a417745346baa4a";

  useEffect(() => {
    const fetchWeather = async (lat, lon, city = "London") => {
      try {
        const url = lat && lon
          ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
          : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
        
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error al obtener el clima:", error);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          () => {
            console.warn("No se pudo obtener la ubicación, mostrando Londres.");
            fetchWeather(null, null, "London");
          }
        );
      } else {
        console.warn("Geolocalización no soportada, mostrando Londres.");
        fetchWeather(null, null, "London");
      }
    };

    getLocation();
  }, []);
*/

/*
  <div className="p-4">
    {weatherData ? (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">{weatherData.name}</h2>
        <p className="text-gray-700">
          {weatherData.weather[0].description}
        </p>
        <p className="text-lg font-semibold">
          🌡️ {weatherData.main.temp}°C
        </p>
        <p className="text-gray-600">
          Humedad: {weatherData.main.humidity}%
        </p>
        <p className="text-gray-600">
          Viento: {weatherData.wind.speed} m/s
        </p>
      </div>
    ) : (
      <p>Cargando el clima...</p>
    )}
  </div>
);
*/