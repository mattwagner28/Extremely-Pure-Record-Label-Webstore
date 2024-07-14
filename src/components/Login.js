import React, { useState } from "react";
import LoginForm from "./LoginForm";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidMessage, setInvalidMessage] = useState("");

  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setInvalidMessage("Please enter valid e-mail address");
      setEmail("");
      setPassword("");
    } else {
      fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetch Req Successful:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (

    <LoginForm
      handleSubmit={handleSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
      setInvalidMessage={setInvalidMessage}
      email={email}
      password={password}
      invalidMessage={invalidMessage}
    />


    // <div>
    //   <h1>Login</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Email:
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         className="border border-black"
    //       />
    //     </label>
    //     <br />
    //     <label>
    //       Password:
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         className="border border-black"
    //       />
    //     </label>
    //     <br />
    //     <input
    //       className="px-2 font-sans font-semibold hover:bg-cyan-300 active:text-orange-500"
    //       type="submit"
    //       value="Login"
    //     />
    //   </form>
    //   <h4>{invalidMessage}</h4>
    // </div>
  );
}

export default Login;
