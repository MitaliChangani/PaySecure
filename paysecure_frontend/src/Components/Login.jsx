import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import api from "../api/axios";

const API_URL = "http://localhost:8000/api";

axios.defaults.withCredentials = true; // always send cookies

// Attach CSRF token from cookie to every request
axios.interceptors.request.use((config) => {
  const csrfToken = Cookies.get("csrftoken");
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("user_role");
    if (role) {
      const lowerRole = role.toLowerCase();
      if (lowerRole === "franchise") navigate("/FranchiseDs");
      else if (lowerRole === "user") navigate("/UserDs");
      else if (lowerRole === "admin") navigate("/AdminDs");
      else navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // await axios.get(`${API_URL}/csrf/`, { withCredentials: true });

      const response = await axios.post(
        `${API_URL}/login/`,
        { username, password },
        { withCredentials: true }
      );

      console.log("Login response:", response.data);

      localStorage.setItem("user_role", response.data.role);
      localStorage.setItem("user_id", response.data.id);
      localStorage.setItem("username", response.data.username);

      alert("Login Successful!");

      const role = response.data.role.toLowerCase();
      if (role === "franchise") {
        navigate("/FranchiseDs");
      } else if (role === "user") {
        navigate("/UserDs");
      } else if (role === "admin") {
        navigate("/AdminDs");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Please enter valid usename and password!.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-reset-password")}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to="/Register"
              className="text-blue-500 hover:underline font-medium"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;