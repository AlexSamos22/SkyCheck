import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "7aa3fe57771492099a417745346baa4a";

function FechaHoraLocal() {
  const [fechaHora, setFechaHora] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerUbicacion();

    // Establecer un intervalo para actualizar la hora cada minuto (60 * 1000 ms)
    const intervalo = setInterval(() => {
      actualizarFechaHora();
    }, 60000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalo);
  }, []);

  const obtenerUbicacion = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => obtenerZonaHoraria(pos.coords.latitude, pos.coords.longitude),
        () => obtenerZonaHoraria(51.5074, -0.1278) // Londres por defecto si no permite ubicación
      );
    } else {
      obtenerZonaHoraria(51.5074, -0.1278); // Londres si no tiene geolocalización
    }
  };

  const obtenerZonaHoraria = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const zonaHoraria = response.data.timezone / 3600; // Offset en horas
      actualizarFechaHora(zonaHoraria);
    } catch (error) {
      console.error("Error al obtener la zona horaria", error);
      actualizarFechaHora(0); // Si hay error, usa UTC
    }
  };

  const actualizarFechaHora = (offset = 0) => {
    const ahora = new Date();
    ahora.setHours(ahora.getUTCHours() + offset); // Ajustamos la hora a la zona horaria

    const opcionesFecha = { weekday: "long", day: "numeric" };
    const opcionesHora = { hour: "2-digit", minute: "2-digit"};

    // Formatear día con la primera letra en mayúscula
    let diaSemana = ahora.toLocaleDateString("es-ES", opcionesFecha);
    diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);

    setFechaHora({
      diaSemana,
      hora: ahora.toLocaleTimeString("es-ES", opcionesHora),
    });

    setLoading(false);
  };

  return (
    <div className="text-lg font-semibold text-orange-600">
      {loading ? "Cargando..." : `${fechaHora.diaSemana} - ${fechaHora.hora}`}
    </div>
  );
}

export default FechaHoraLocal;



