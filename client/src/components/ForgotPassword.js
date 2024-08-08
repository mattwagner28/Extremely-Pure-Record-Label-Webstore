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

    
    if (!emailRegex.test(email)) {
        setInvalidMessage("Please enter a valid e-mail address");
        setEmail("");
        }
    console.log(email);

    try {
    const resetPassword = await fetch("http://localhost:3001/users/forgot-password", {
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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-black"
          />
        </label>
        <br />

        <input
          className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
          type="submit"
          value="Reset Password"
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
