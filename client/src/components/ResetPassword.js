import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

function ResetPassword() {
  const { id, token } = useParams();
  const [tokenVerified, setTokenVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [noMatchMessage, setNoMatchMessage] = useState("");
  

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const getResponse = await fetch(`http://localhost:3001/users/reset-password/${id}/${token}`)
        const tokenStatus = await getResponse.json();
        console.log(getResponse, tokenStatus);
        if (getResponse.ok) {
          setTokenVerified(true);
        }
        
      } catch (error) {
        
      }
    }
    verifyToken()
  }, [])

  const handleSubmit = e => {
    e.preventDefault(); 
    if (password !== confirmedPassword) {
      setNoMatchMessage("Passwords must match!");
    }



  };

  return (
    tokenVerified ?
    <div>
      <h1>Create New Password</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-black"
        />
        <br />

        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          className="border border-black"
        />
        <br />

        <input
          className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
          type="submit"
          value="Reset Password"
        />
      </form>
      <h3>{noMatchMessage}</h3>
    </div>

    : 

    <h2>Sorry! Your password reset link has expired. Please resubmit a request to your email <NavLink to="/forgotpassword" className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">here</NavLink>.</h2>
  );
}

export default ResetPassword;
