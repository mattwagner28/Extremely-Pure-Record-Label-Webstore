import React from "react";
import { NavLink } from "react-router-dom";

function Nav () {
    return (
        <nav className='hidden lg:flex z-10 justify-between fixed top-0 w-full bg-red-100 px-8'>
            <NavLink to="/" className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">HOME</NavLink>
            <NavLink to="/store" className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">STORE</NavLink>
            <NavLink to="/artists" className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">ARTISTS</NavLink>
            <NavLink to="/discography" className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">DISCOGRAPHY</NavLink>
            <NavLink to="/playlists" className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">PLAYLISTS</NavLink>
            <NavLink to="/about" className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">ABOUT</NavLink>
            <NavLink to="/stemplayer" className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">STEM PLAYER</NavLink>
        </nav>
    )
}

export default Nav;
