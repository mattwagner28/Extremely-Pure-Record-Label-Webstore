import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./components/Root";

function Nav({ toggleCart, signout }) {
  const loggedIn = useContext(UserContext);

  return (
    <nav className="hidden lg:flex z-10 justify-between fixed top-0 w-full bg-red-100 px-8">
      <NavLink
        to="/"
        className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
      >
        HOME
      </NavLink>

      <NavLink
        to="/store"
        className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
      >
        STORE
      </NavLink>

      {/* <NavLink
        to="/artists"
        className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
      >
        ARTISTS
      </NavLink> */}

      <NavLink
        to="/discography"
        className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
      >
        DISCOGRAPHY
      </NavLink>

      <NavLink
        to="/playlists"
        className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
      >
        PLAYLISTS
      </NavLink>

      <NavLink
        to="/about"
        className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
      >
        ABOUT
      </NavLink>

      {/* <NavLink
        to="/stemplayer"
        className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
      >
        STEM PLAYER
      </NavLink> */}

      {loggedIn ? (
        <>
          <NavLink
            onClick={signout}
            to="/"
            className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
          >
            LOGOUT
          </NavLink>
          <NavLink
            to="/profile"
            className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
          >
            <img
              src="user.png"
              height="8"
              width="20"
              className="pt-0.5"
              alt="profile icon"
            />
          </NavLink>
        </>
      ) : (
        <NavLink
          to="/login"
          className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
        >
          <img
            src="user.png"
            height="8"
            width="20"
            className="pt-0.5"
            alt="profile icon"
          />
        </NavLink>
      )}

      <button
        onClick={toggleCart}
        className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
      >
        <img
          src="shopping-cart.png"
          height="24"
          width="24"
          alt="shopping cart icon"
        />
      </button>
    </nav>
  );
}

export default Nav;
