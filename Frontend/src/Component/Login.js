import React, { useState } from "react";
import "./Login.css";
function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Remove spaces from beginning and end of username
    const cleanUsername = username.trim();

    // 1. Username is empty
    if (cleanUsername === "") {
      alert("Please enter your username");
      return;
    }

    // 2. Password is empty
    if (password.trim() === "") {
      alert("Please enter your password");
      return;
    }

    // 3. Username validation
    if (!/^[A-Za-z0-9_]+$/.test(cleanUsername)) {
      alert("Username can contain only letters, numbers, and underscore");
      return;
    }

    // 4. Password minimum length
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: cleanUsername,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          setUser(data.user);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Server error");
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2>Login</h2>
          <p>Sign in to your account</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-field">
            <label htmlFor="username">Username</label>

            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
