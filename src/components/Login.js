import React, { useState } from "react";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log ("success", {
            email,
            password
        })

    };
    

    return (
        <div>
            <h1>Login section goes here!</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                <input onChange={(e) => setEmail(e.target.value)} type="text" email="email" />
                </label>

                <label>
                    Password:
                <input onChange={(e) => setPassword(e.target.value) } type="text" email="password" />
                </label>
                <input type="submit" />
            </form>
        </div>
    )
}

export default Login;