import React from "react";
import Logo from "../components/Logo";
import Nav from "../Nav";
import Home from "../components/home/Home";
import { Outlet, useLocation } from "react-router-dom";


function Root() {
    
    // Check if the current URL matches the desired route
    const location = useLocation();
    const isHomeRoute = location.pathname === "/";

    return (
      <>
        <Logo />
        <Nav />
        {isHomeRoute && <Home />}
        <main>
            <Outlet />
        </main>


      </>
    );
  }
  
export default Root;