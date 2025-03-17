import React from "react";
import Weather from "../components/tiempo-ciudad";
import MainImg from "../components/main-img";
import TarjetasNoticias from "../components/tarjetas-noticias";
import Tornados from "../assets/estados-unidos-tornados.webp";
import Andalucia from "../assets/andaluciatornados.webp";
import Incendio from "../assets/incendios.jpg";
import BorrascasEsp from "../assets/borrascasesp.webp";
import Aumentomar from "../assets/aumentomar.webp";
import Inundacion from "../assets/inundacion.jpg";

function Home() {
  return (
    <div>
      <MainImg />
      <Weather />
      <div className="m-2 p-4 flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-blue-500">Noticias destacadas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center">
        <TarjetasNoticias
          img={Tornados}
          titulo="El impacto de tornados y fuertes tormentas provocan al menos 31 muertes en Estados Unidos"
          contenido="Las tormentas más feroces de la última década han barrido el sur y centro de EE.UU., con tornados de categoría EF4, incendios arrasadores y vientos de 270 km/h."
          link="/tornadosUSA"
        />
        <TarjetasNoticias
          img={Andalucia}
          titulo="La AEMET prevé hasta tornados en Andalucía: a estas horas llegará el gran arreón de tormentas, lluvias fuertes y nieve"
          contenido="En las próximas horas las lluvias se intensificarán en Andalucía debido al paso de la borrasca Laurence. Serán localmente fuertes y tormentosas, y AEMET avisa de la posibilidad de mangas marinas o tornados."
          link="/tornadosAndalucia"
        />
        <TarjetasNoticias
          img={Incendio}
          titulo="La actividad de incendios forestales aumentó durante los abruptos cambios climáticos de la Edad de Hielo"
          contenido="Un nuevo estudio revela la presencia de una mayor actividad de incendios forestales como una característica potencial de los períodos de cambio climático abrupto en el pasado."
          link="/incendios"
        />
        <TarjetasNoticias
          img={BorrascasEsp}
          titulo="España podría verse afectada por el tren de borrascas más largo de los últimos años con Laurence a la vista"
          contenido="El tren de borrasca que nos está afectando nos ha traído tres borrascas de alto impacto y nombradas: empezó con Jana a inicios de marzo, siguió con Konrad y ahora llega Laurence, que nos afectará la semana venidera. Además, la calidad de su carga ha sido extraordinaria en cuanto a la cantidad de lluvia y nieve."
          link="/borrascasEsp"
        />
        <TarjetasNoticias
          img={Aumentomar}
          titulo="Los científicos de la NASA muestran un aumento inesperado del nivel del mar en 2024 ¿Cuáles han sido las razones?"
          contenido="Los científicos se han sorprendido por el aumento del nivel del mar que se observó en 2024 y que fue mayor de lo esperado. Las tendencias de la subida del nivel del mar seguirá en los años venideros."
          link="/aumentorMar"
        />
        <TarjetasNoticias
          img={Inundacion}
          titulo="Una riada de 310.000 m³ arrasa Jarandilla de la Vera y deja atrapado a un matrimonio"
          contenido="El silencio de la madrugada en Jarandilla de la Vera se vio interrumpido por el estrépito del agua desbordada. La fractura de la balsa de riego del Charco de la Maricana liberó sin control 310.000 metros cúbicos de agua."
          link="/Inundacion"
        />

        <TarjetasNoticias
          img={Tornados}
          titulo="El impacto de tornados y fuertes tormentas provocan al menos 31 muertes en Estados Unidos"
          contenido="Las tormentas más feroces de la última década han barrido el sur y centro de EE.UU., con tornados de categoría EF4, incendios arrasadores y vientos de 270 km/h."
          link="/tornadosUSA"
        />

        <TarjetasNoticias
          img={Tornados}
          titulo="El impacto de tornados y fuertes tormentas provocan al menos 31 muertes en Estados Unidos"
          contenido="Las tormentas más feroces de la última década han barrido el sur y centro de EE.UU., con tornados de categoría EF4, incendios arrasadores y vientos de 270 km/h."
          link="/tornadosUSA"
        />

        </div>
      </div>

    </div>
  )
}

export default Home;