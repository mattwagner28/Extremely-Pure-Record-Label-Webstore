import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";


function ResetPassword() {
  const { id, token } = useParams();
  const [tokenVerified, setTokenVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const getResponse = await fetch(`https://extremelypure-server.onrender.com/users/reset-password/${token}`)
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
      const response = await fetch(`https://extremelypure-server.onrender.com/users/${id}`, {
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
        setErrorMessage("");
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
    <div className="w-3/5 lg:w-1/5">
      <h1 className="font-bold text-center text-2xl">CREATE NEW PASSWORD</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter new password:</label>
        <div className="flex">
        <input
          type={passwordVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full block border border-black rounded"
        />
                    <span
              className="cursor-pointer ml-2"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <i className="fas fa-eye"></i> // Font Awesome eye icon
              ) : (
                <i className="fas fa-eye-slash"></i> // Font Awesome eye-slash icon
              )}
            </span>
        </div>
        <label>Confirm new password:</label>
        <div className="flex">
        <input
          type={confirmPasswordVisible ? "text" : "password"}
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          className="w-full block border border-black rounded"
        />
                            <span
              className="cursor-pointer ml-2"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? (
                <i className="fas fa-eye"></i> // Font Awesome eye icon
              ) : (
                <i className="fas fa-eye-slash"></i> // Font Awesome eye-slash icon
              )}
            </span>
        </div>
        <br />

        <input
          className="w-full cursor-pointer block px-2 rounded bg-slate-300 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
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
