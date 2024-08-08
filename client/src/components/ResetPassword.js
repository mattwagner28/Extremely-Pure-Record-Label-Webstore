import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";


function ResetPassword() {
  const { id, token } = useParams();
  const [tokenVerified, setTokenVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const getResponse = await fetch(`http://localhost:3001/users/reset-password/${token}`)
        const tokenStatus = await getResponse.json();
        console.log(tokenStatus);
        if (getResponse.ok) {
          setTokenVerified(true);
        } else {
          setTokenVerified(false);
        };
        
      } catch (error) {
        console.error(error);
        setTokenVerified(false);
      }
    }
    verifyToken()
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    if (password !== confirmedPassword) {
      setErrorMessage("Passwords must match!");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          token,
          password,
        })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Handle success 
        console.log("Password successfully reset:", response);
        setSuccessMessage("Password successfylly changed. Redirecting to login page...")
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        // Handle different error cases based on the response
        console.error("Error:", result.message);
        setErrorMessage(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error in PUT Request:", error);
      setErrorMessage("An error occurred. Please try again.");
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
      {successMessage && <h3>{successMessage}</h3>} 
      {errorMessage && <h3>{errorMessage}</h3>}
    </div>

    : 

    <h2>Sorry! Your password reset link has expired. Please resubmit a request to your email <NavLink to="/forgotpassword" className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">here</NavLink>.</h2>
  );
}

export default ResetPassword;
