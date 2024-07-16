import React, { useEffect, useState, createContext } from "react";
import Logo from "../components/Logo";
import Nav from "../Nav";
import Home from "../components/home/Home";
import { Outlet, useLocation } from "react-router-dom";

export const UserContext = createContext();

function Root() {
    const [loggedIn, setLoggedIn] = useState(false);
    
    // Check if the current URL matches the desired route
    const location = useLocation();
    const isHomeRoute = location.pathname === "/";

    useEffect(() => {
      // console.log(document.cookie);
       fetch("http://localhost:3001/users/verifytoken", {
        credentials: 'include',
      })
      .then(response => response.json())
      .then(tokenVerification => {
          console.log('Token payload', tokenVerification);
          if (tokenVerification.error) {
          setLoggedIn(false);
          } else {
            setLoggedIn(true);
          }
          console.log("Logged in?:", loggedIn);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoggedIn(false);
      })
    });

    return (
      <UserContext.Provider value={loggedIn}>
        <>
          <Logo />
          <Nav />
          {isHomeRoute && <Home />}
          <main className="flex justify-center mt-1">
              <Outlet />
          </main>
          


        </>
      </UserContext.Provider>
    );
  }
  
export default Root;