import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login response:", data);

      // ==========================================
      // LOGIN FAILED
      // ==========================================
      if (!response.ok) {
        alert(data.detail || "Invalid email or password");
        return;
      }

      // ==========================================
      // SAVE LOGIN DATA
      // ==========================================
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");

      // ==========================================
      // REDIRECT BASED ON ROLE
      // ==========================================

      if (data.user.role === "CLIENT") {
        navigate("/dashboard");
      } else if (data.user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "BROKER") {
        navigate("/broker/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* ================================
          BANNER
      ================================= */}
      <section className="login-banner">
        <div className="login-banner-overlay">
          <h1>Find Your Perfect Life Partner</h1>

          <p>
            Welcome back! Sign in to continue your search for a meaningful
            relationship.
          </p>
        </div>
      </section>

      {/* ================================
          LOGIN CARD
      ================================= */}
      <div className="login-card">

        <div className="login-header">
          <h2>Welcome Back ❤️</h2>
          <p>Login to your account</p>
        </div>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Links */}
          <div className="login-links">

            <a href="#">
              Forgot Password?
            </a>

            <a href="/registration">
              Create Account
            </a>

          </div>

        </form>

      </div>
    </div>
  );
}