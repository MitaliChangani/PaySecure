import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import api from "../api/axios";
export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem("user_role");
    setIsLoggedIn(!!role);
    setUserRole(role ? role.toLowerCase() : null);
    const handleStorageChange = () => {
      const role = localStorage.getItem("user_role");
      setIsLoggedIn(!!role);
      setUserRole(role ? role.toLowerCase() : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/logout/", {}, { withCredentials: true });

      localStorage.clear();
      setIsLoggedIn(false);
      setUserRole(null);
      alert("Logged out successfully!");
      navigate("/Login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      alert("Logout failed. Please try again.");
    }
  };
  const getDashboardPath = () => {
    if (userRole === "franchise") return "/FranchiseDs";
    if (userRole === "user") return "/UserDs";
    if (userRole === "admin") return "/AdminDs";
    return "/";
  };
  return (
    <header className="w-full bg-[#476EAE] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <h1 className="text-xl font-bold text-white">PaySecure</h1>
        <div className="hidden md:flex items-center space-x-3">
          {!isLoggedIn ? (
            <>
              <button onClick={() => navigate("/Login")} className="px-5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800">
                Login
              </button>
              <button onClick={() => navigate("/Register")} className="px-5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800">
                Create Account
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate(getDashboardPath())} className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
                Dashboard
              </button>
              <button onClick={handleLogout} className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
                Logout
              </button>
            </>
          )}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-800">
          {menuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-black shadow-md border-t border-gray-800">
          <nav className="flex flex-col items-center space-y-4 py-4 font-medium text-white">
            {!isLoggedIn ? (
              <>
                <button onClick={() => { navigate("/Login"); setMenuOpen(false); }} className="w-40 px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-800">
                  Login
                </button>
                <button onClick={() => { navigate("/Register"); setMenuOpen(false); }} className="w-40 px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800">
                  Create Account
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { navigate(getDashboardPath()); setMenuOpen(false); }} className="w-40 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700">
                  Dashboard
                </button>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="w-40 px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700">
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}