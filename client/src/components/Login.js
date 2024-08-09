import React, { useContext, useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { UserContext, UserContextUpdater } from "../components/Root";

function Login() {
  const [email, setEmail] = useState("");   
  const [password, setPassword] = useState("");
  const [invalidMessage, setInvalidMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const loggedIn = useContext(UserContext);
  const { setLoggedIn } = useContext(UserContextUpdater);

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
        setLoggedIn(true); // Update the loggedIn state in Root
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
      console.log(loggedIn);
  }, [loggedIn]);

  if (loggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="w-3/5 lg:w-1/5">
      <h1 className="font-bold text-center text-2xl">LOGIN</h1>
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
        <label>
          Password
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
        </label>
        <br />
        <input
          className="w-full cursor-pointer block px-2 rounded bg-slate-300 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
          type="submit"
          value="Sign In "
        />
      </form>
      <h4>{invalidMessage}</h4>

        <NavLink to="/signup"  className="text-center mt-2 block px-2 rounded bg-slate-300 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">Create Account</NavLink>
        <NavLink to="/forgotpassword"  className="text-center mt-2 block px-2 rounded bg-slate-300 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500">Forgot Password?</NavLink>

    </div>
  );
}

export default Login;
