import React, { useState } from "react";
// import { Navigate, NavLink } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [invalidMessage, setInvalidMessage] = useState("");
  const [formVisibility, setFormVisibility] = useState(true);

  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const toggleForm = () => setFormVisibility(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!emailRegex.test(email) || email === null) {
        return setInvalidMessage("Please enter a valid e-mail address");
        }

    try {
    const resetPassword = await fetch("https://extremelypure-server.onrender.com/users/forgot-password", {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ email })
    })
    const resetResponse = await resetPassword.json();
    console.log("Password Reset Response:", resetResponse);
    toggleForm();
  }
  catch (error) {
    setInvalidMessage("An error occurred. Please try again.")
  }
  };


  return (
    formVisibility ?
    <div className="w-3/5 lg:w-1/5">
      <h1 className="font-bold text-center text-2xl">RESET PASSWORD</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full block border border-black rounded"
          />
        </label>
        <br />

        <input
          className="w-full cursor-pointer block px-2 rounded bg-slate-300 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
          type="submit"
          value="Reset"
        />
      </form>
      <h4>{invalidMessage}</h4>
    </div>

    :

    <div>
    <h3>Please check your email for instructions to reset your password. </h3>

    </div>
  )
}

export default ForgotPassword;
