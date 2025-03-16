import React, { useEffect, useState } from "react";
import axios from "axios";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FechaHoraLocal from "../components/fecha-hora";

const API_KEY = "7aa3fe57771492099a417745346baa4a";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [position, setPosition] = useState([51.5074, -0.1278]); // Londres por defecto
  const [cityName, setCityName] = useState("London");
  const [forecastData, setForecastData] = useState(null); // Para la predicción de 5 días


  useEffect(() => {
    const fetchWeather = async (lat, lon, city = "London") => {
      try {
        const url = lat && lon
          ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
          : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

        const response = await axios.get(url);
        setWeatherData(response.data);

        if (lat && lon) {
          setPosition([lat, lon]);
          setCityName(response.data.name);
        }

        // Obtener la predicción de 5 días
        const urlPronostico = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
        const responsePronostico = await axios.get(urlPronostico);
        setForecastData(responsePronostico.data);

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

  // Función para mostrar el pronóstico de 5 días
  const obtenerPronostico5Dias = () => {
    if (!forecastData) return null;
    return forecastData.list.slice(0, 5).map((item, index) => {
      const date = new Date(item.dt * 1000); // Convertir a fecha
      return (
          <div key={index} className="p-2 w-full">
            <h4>{date.toLocaleString()} - {item.weather[0].description}</h4>
            <p>Temperatura: {item.main.temp}°C</p>
            <p>Viento: {item.wind.speed} m/s</p>
          </div>
      );
    });
  };

  // Función para mostrar la predicción de las siguientes 3 horas
  const obtenerPronostico3Horas = () => {
    if (!forecastData) return null;
    return forecastData.list.slice(0, 3).map((item, index) => {
      const date = new Date(item.dt * 1000); // Convertir a fecha
      const options = { hour: "2-digit", minute: "2-digit", hour12: false };

      const hora = date.toLocaleString("es-ES", options);
      return (
          <div key={index} className="p-2 w-full">
            <h4>{hora} - {item.weather[0].description}</h4>
            <p>Temperatura: {item.main.temp}°C</p>
            <p>Viento: {item.wind.speed} m/s</p>
          </div>

      );
    });
  };

  // Función para obtener el icono del clima
  const obtenerIconoClima = (clima) => {
    switch (clima) {
      case "Clear":
        return <WiDaySunny className="text-yellow-500 text-6xl" />;
      case "Clouds":
        return <WiCloud className="text-gray-500 text-6xl" />;
      case "Rain":
        return <WiRain className="text-blue-500 text-6xl" />;
      case "Snow":
        return <WiSnow className="text-white text-6xl" />;
      case "Thunderstorm":
        return <WiThunderstorm className="text-purple-500 text-6xl" />;
      default:
        return <WiCloud className="text-gray-400 text-6xl" />;
    }
  };

  return (
    <>
      <div className="p-4 grid grid-cols-2 justify-items-center content-center gap-4 ">
        {/* Información del Clima */}
        <div className="p-6 flex flex-col items-center w-full">
          <FechaHoraLocal />
          {weatherData ? (
            <>
              <h2 className="text-2xl font-bold mb-2">{weatherData.name}</h2>

              <p className="text-lg font-semibold flex justify-center items-center"> {obtenerIconoClima(weatherData.weather[0].main)} {weatherData.main.temp}°C</p>

              <p className="text-black font-semibold">
                {weatherData.weather[0].description.charAt(0).toUpperCase() +
                  weatherData.weather[0].description.slice(1)}, Sensación térmica: {weatherData.main.feels_like}°C
              </p>

              <p className="text-black font-semibold">Humedad: {weatherData.main.humidity}%</p>
              <p className="text-black font-semibold">Viento: {weatherData.wind.speed} m/s</p>
              <p className="text-black font-semibold">Visibilidad: {(weatherData.visibility / 1000).toFixed(1)} km</p>
            </>
          ) : (
            <p>Cargando el clima...</p>
          )}
        </div>

        {/* Mapa OpenStreetMap */}
        <div className="p-6 w-full">
          {weatherData && (
            <MapContainer center={position} zoom={10} style={{ width: "100%", height: "300px", borderRadius: "10px" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>
                  <b>{cityName}</b><br />
                  Temp: {weatherData.main.temp}°C<br />
                  Viento: {weatherData.wind.speed} m/s
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>

        <div className="p-4 w-full">
          <h3 className="font-bold text-lg">Pronóstico de las próximas 3 horas</h3>
          <div className="flex justify-center items-center">
            {obtenerPronostico3Horas()}
          </div>
          
        </div>


        <div className="p-4 w-full">
          <h3 className="font-bold text-lg">Pronóstico de los próximos 5 días</h3>
          <div className="flex justify-center items-center">
            {obtenerPronostico5Dias()}
          </div>
          
        </div>

      </div>
    </>
  );
};

export default Weather;
