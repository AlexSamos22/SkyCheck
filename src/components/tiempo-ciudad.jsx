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

    const pronosticoPorDia = {};
    const hoy = new Date().toLocaleDateString("es-ES", { weekday: "long" });

    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const fecha = date.toLocaleDateString("es-ES", { weekday: "long" });

      if (fecha !== hoy) {
        if (
          !pronosticoPorDia[fecha] ||
          Math.abs(date.getHours() - 12) <
          Math.abs(new Date(pronosticoPorDia[fecha].dt * 1000).getHours() - 12)
        ) {
          pronosticoPorDia[fecha] = item;
        }
      }
    });

    return Object.keys(pronosticoPorDia).map((dia, index) => {
      const item = pronosticoPorDia[dia];

      return (
        <div key={index} className="p-2 w-full border-b border-blue-500 last:border-b-0 flex items-center justify-between">
          <h4 className="capitalize font-bold flex items-center text-orange-600 w-1/2">{dia}</h4>
          <p className="text-base font-semibold flex items-center w-full">{obtenerIconoClima(item.weather[0].main)} {item.main.temp}°C</p>

          <p className="text-base font-semibold flex items-center w-full">
            🌤️ {item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)}
          </p>

          <p className="text-base font-semibold flex items-center w-full">
            💨 Viento: {item.wind.speed} m/s
          </p>

          <p className="text-base font-semibold flex items-center w-full">
            💧 Humedad: {item.main.humidity}%
          </p>
        </div>
      );
    });
  };





  // Función para mostrar la predicción de las siguientes 3 horas
  const obtenerPronostico3Horas = () => {
    if (!forecastData) return null;

    const ahora = new Date();
    const pronosticoFiltrado = forecastData.list.filter((item) => {
      const horaPronostico = new Date(item.dt * 1000);
      return horaPronostico.getTime() > ahora.getTime();
    });

    if (pronosticoFiltrado.length < 3) return <p>No hay suficientes datos</p>;

    return pronosticoFiltrado.slice(1, 6).map((item, index) => {
      const date = new Date(item.dt * 1000);
      const hora = date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      return (
        <div key={index} className="p-2 w-full border-b border-blue-500 last:border-b-0 flex  items-center justify-between">
          <h4 className="capitalize font-bold self-center text-orange-600 w-1/2">{hora}</h4>

          <p className="text-base font-semibold flex items-center w-full">
            {obtenerIconoClima(item.weather[0].main)}
            {item.main.temp}°C
          </p>

          <p className="text-base font-semibold flex items-center w-full">
            🌤️ {item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)}
          </p>

          <p className="text-base font-semibold flex items-center w-full">
            💨 Viento: {item.wind.speed} m/s
          </p>


          <p className="text-base font-semibold flex items-center w-full">
            💧 Humedad: {item.main.humidity}%
          </p>
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
      <div className="m-2 grid grid-cols-2 justify-items-center content-center gap-4 ">
        {/* Información del Clima */}
        <div className="p-6 flex flex-col items-center w-full gap-2">
          <FechaHoraLocal />
          {weatherData ? (
            <>
              <h2 className="text-2xl font-bold">{weatherData.name}</h2>

              {/* Temperatura e icono */}
              <p className="font-semibold flex items-center gap-2 text-xl w-full justify-center">
                {obtenerIconoClima(weatherData.weather[0].main)}
                <span>{weatherData.main.temp}°C</span>
              </p>

              {/* Descripción del clima */}
              <p className="text-black font-semibold text-center flex items-center gap-2 justify-center text-xl">
                {weatherData.weather[0].description.charAt(0).toUpperCase() +
                  weatherData.weather[0].description.slice(1)}, Sensación térmica: {weatherData.main.feels_like.toFixed(0)}°C
              </p>

              {/* Humedad */}
              <p className="text-black font-semibold flex items-center gap-2 text-xl justify-center">
                <span>💧</span>
                <span>Humedad: {weatherData.main.humidity}%</span>
              </p>

              {/* Viento */}
              <p className="text-black font-semibold flex items-center gap-2 text-xl justify-center">
                <span>💨</span>
                <span>Viento: {weatherData.wind.speed} m/s</span>
              </p>

              {/* Visibilidad */}
              <p className="text-black font-semibold flex items-center gap-2 text-xl justify-center">
                <span>🌫️</span>
                <span>Visibilidad: {(weatherData.visibility / 1000).toFixed(1)} km</span>
              </p>
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
          <h3 className="font-bold text-lg">Pronóstico en las proximas horas</h3>
          <div className="">
            {obtenerPronostico3Horas()}
          </div>

        </div>


        <div className="p-4 w-full">
          <h3 className="font-bold text-lg">Pronóstico de los próximos 5 días</h3>
          <div className="">
            {obtenerPronostico5Dias()}
          </div>

        </div>

      </div>
    </>
  );
};

export default Weather;
