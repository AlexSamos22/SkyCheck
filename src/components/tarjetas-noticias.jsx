import React from "react";
import { Link } from "react-router-dom";

function TarjetasNoticias({ img, titulo, contenido, link }) {
    return (

        <div className="w-full h-full bg-white border text-black rounded-lg shadow-[0px_0px_10px_3px_rgba(0,0,0,0.15)]  flex flex-col">
            
            <Link to={link}>
                <img className="rounded-t-lg w-full h-56 object-cover" src={img} alt={titulo} />
            </Link>

            <div className="p-5 flex flex-col flex-grow justify-between text-black">
                <h5 className="mb-2 text-2xl font-bold tracking-tight ">{titulo}</h5>
                <p className="mb-3 font-normal ">{contenido}</p>

                {/* El botón se empuja hacia el fondo usando mt-auto */}
                <Link to={link} className="w-max inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-orange-600 rounded-lg hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-blue-300 mt-auto">
                    Leer más
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default TarjetasNoticias;


