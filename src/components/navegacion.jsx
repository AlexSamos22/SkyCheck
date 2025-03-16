import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";


function Navegacion() {
    return (
        <nav className="bg-white rounded-lg m-2 md:flex md:items-center md:justify-between p-4 font-medium text-black shadow-[0px_0px_10px_3px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-center  md:flex md:items-center md:justify-start">
                <img src={logo} alt="logo web" className="w-1/6" />
                <h1 className="text-black text-xl ml-4"><span className="text-orange-500">Sky</span><span className="text-blue-500">Check</span></h1>  
            </div>

            <ul className="flex items-center justify-center gap-8 mt-4 md:mt-0 w-full">
                <li className="hover:underline me-4 md:me-6 text-orange-500 ">
                    <Link to="/">Inicio</Link>
                </li>

                <li className="hover:underline me-4 md:me-6 text-orange-500">
                    <Link to="/proyecto">Sobre el proyecto</Link>
                </li>
            </ul>

            <form className="w-full max-w-sm mt-4 md:mt-0">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-orange-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border-2 border-blue-500 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-orange-500 " placeholder="Buscar..." required />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-orange-500 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2">Buscar</button>
                </div>
            </form>
        </nav>
    )
}
export default Navegacion;