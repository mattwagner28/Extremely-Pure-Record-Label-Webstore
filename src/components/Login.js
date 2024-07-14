import React, {  useState } from "react";
import { Navigate, NavLink } from "react-router-dom";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidMessage, setInvalidMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);



  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setInvalidMessage("Please enter valid e-mail address");
      setEmail("");
      setPassword("");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetch Req Successful:", data);
      setLoggedIn(true); // Update loggedIn state upon successful login
      console.log("logged in:", loggedIn);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  };

  return (

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
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-black"
          />
        </label>
        <br />
        <input
          className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
          type="submit"
          value="Login"
        />
      </form>
      <h4>{invalidMessage}</h4>
      <NavLink to="/signup" className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">Or, signup!</NavLink>
    </div>
  );
}



export default Login;
