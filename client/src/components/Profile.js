import React, {  useContext } from "react";
import { UserContext } from "../components/Root";
import {  NavLink } from "react-router-dom";




function Profile() {
    const loggedIn = useContext(UserContext);

    if (loggedIn) {
    return (
        <>
        <h1>Sup logged in dude</h1>
        </>
      )
    } else {
       return  <NavLink to="/login" className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">Please login. </NavLink>
    };
};


export default Profile;
