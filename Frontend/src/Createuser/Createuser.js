import React, { useState } from "react";
import "./CreateUser.css";

function Createuser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleCreateUser = (e) => {
    e.preventDefault();

    const cleanUsername = username.trim();

    // Username validation
    if (cleanUsername === "") {
      alert("Please enter username");
      return;
    }

    if (!/^[A-Za-z0-9_]+$/.test(cleanUsername)) {
      alert("Username can contain only letters, numbers, and underscore");
      return;
    }

    // Password validation
    if (password.trim() === "") {
      alert("Please enter password");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // Role validation
    if (role !== "admin" && role !== "user") {
      alert("Please select a valid role");
      return;
    }

    fetch(
      "https://student-registration-backend-9miv.onrender.com/create-users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: cleanUsername,
          password: password,
          role: role,
        }),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          alert("User created successfully");

          // Clear form
          setUsername("");
          setPassword("");
          setRole("user");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Create user error:", error);
        alert("Server error");
      });
  };

  return (
    <div className="create-user-page">
      <div className="create-user-container">
        <div className="create-user-header">
          <h2>Create User</h2>
          <p>Create a new account for the system</p>
        </div>

        <form className="create-user-form" onSubmit={handleCreateUser}>
          {/* Username */}
          <div className="create-user-field">
            <label htmlFor="username">Username</label>

            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="create-user-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Role */}
          <div className="create-user-field">
            <label htmlFor="role">Role</label>

            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Button */}
          <button className="create-user-button" type="submit">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default Createuser;
