import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "../styles/Login.css"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // Get login function from context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Store token & role in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      login(); // ✅ Update auth state immediately

      // Redirect based on user role
      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "manager") navigate("/manager");
      else navigate("/home"); // Default for team members

    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>}

      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="submit-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
