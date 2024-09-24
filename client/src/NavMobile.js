import React from "react";
import { NavLink } from "react-router-dom";

function NavMobile({ toggleCart, toggleNavVisibility, loggedIn }) {
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center h-20 p-4 bg-white shadow-md z-10">

      <NavLink to="/" className="w-1/4 h-auto object-contain">
        <img
          src="/logo.jpg"
          alt="logo"
        />
        </NavLink>


      <div className="flex w-2/5 justify-between">
      <NavLink to={loggedIn ? "/profile" : "/login"}>
        <img
          src="/user.png"
          className="w-8 h-8 mt-2 object-contain cursor-pointer"
          alt="profile icon"

        />
        </NavLink>

        <img
          src="/shopping-cart.png"
       className="w-8 h-8 mt-2 cursor-pointer"
          alt="shopping cart icon"
          onClick={
            toggleCart
          }
        />

        <img
          src="/hamburger.png"
          className="w-12 h-12 cursor-pointer"
          alt="Menu"
          onClick={toggleNavVisibility}
        />
      </div>
    </nav>
  );
}

export default NavMobile;
