import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";


function Navegacion() {
    return(
        <nav className="bg-sky-400 rounded-lg m-4 md:flex md:items-center md:justify-between p-4">
            <div className="md:flex md:items-center md:justify-start">
                <img src={logo} alt="logo web" className="w-1/6"/>
                <h1 className="text-black text-xl">SkyCheck</h1>
            </div>
            
            <ul className="flex items-center justify-between gap-8">
                <li>
                    <Link to="/">Inicio</Link>
                </li>

                <li>
                    <Link to="/proyecto">Sobre el proyecto</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navegacion;