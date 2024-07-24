import React, { useContext, useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { UserContext, UserContextUpdater } from "../components/Root";

function Login() {
  const [email, setEmail] = useState("");   
  const [password, setPassword] = useState("");
  const [invalidMessage, setInvalidMessage] = useState("");
  const loggedIn = useContext(UserContext);
  const { setLoggedIn } = useContext(UserContextUpdater);

  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setInvalidMessage("Please enter a valid e-mail address");
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
        setInvalidMessage("Incorrect email or password");
        throw new Error("Network response was not ok");
      } else {
        const data = await response.json();
        console.log("Fetch Req Successful:", data);
        console.log("logged in:", loggedIn);
        setLoggedIn(true); // Update the loggedIn state in Root
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
      console.log(loggedIn);
  },);

  // Redirect to /profile if logged in
  if (loggedIn) {
    return <Navigate to="/profile" />;
  }

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
