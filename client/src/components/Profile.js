import React, { useContext } from "react";
import { UserContext } from "../components/Root";
import { NavLink } from "react-router-dom";

function Profile() {
  const loggedIn = useContext(UserContext);

  if (loggedIn) {
    return (
      <>
        <h1 className="font-bold text-center text-2xl">
          you are now logged in
        </h1>
      </>
    );
  } else {
    return (
      <div>
        <h1 className="font-bold text-center text-2xl">PROFILE</h1>
        <NavLink
          to="/login"
          className="text-center mt-2 block p-6 rounded bg-slate-300 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
        >
          Please login.
        </NavLink>
      </div>
    );
  }
}

export default Profile;
