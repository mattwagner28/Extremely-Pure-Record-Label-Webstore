import React from "react";


function LoginForm(props) {
    return (
<div>
      <h1>Login</h1>
      <form onSubmit={props.handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
            className="border border-black"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
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
      <h4>{props.invalidMessage}</h4>
    </div>
    )
}

export default LoginForm;