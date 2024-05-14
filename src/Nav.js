import React from "react";
import { NavLink } from "react-router-dom";

function Nav () {
    return (
        <div className='flex justify-center'>
            <NavLink to="/" className="2 px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">HOME</NavLink>
            <NavLink to="/store" className="2 px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">STORE</NavLink>
            <NavLink to="/artists" className="2 px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">ARTISTS</NavLink>
            <NavLink to="/discography" className="2 px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">DISCOGRAPHY</NavLink>
            <NavLink to="/playlists" className="2 px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">PLAYLISTS</NavLink>
            <NavLink to="/about" className="2 px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">ABOUT</NavLink>
            <NavLink to="/stemplayer" className="2 px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">STEM PLAYER</NavLink>
        </div>
    )
}

export default Nav;
