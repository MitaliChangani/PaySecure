import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const userRole = localStorage.getItem("user_role");
    if (userRole) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <header className="w-full bg-[#476EAE] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <h1 className="text-xl font-bold text-white">PaySecure</h1>
        <nav className="hidden md:flex items-center space-x-6 font-medium text-white">
        </nav>
        <div className="hidden md:flex items-center space-x-3">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/Login")}
                className="px-5 py-2 rounded-lg font-medium bg-gray-700 text-white hover:bg-gray-800"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 rounded-lg font-medium bg-gray-700 text-white hover:bg-gray-800"
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-5 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-800"
        >
          {menuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-black shadow-md border-t border-gray-800">
          <nav className="flex flex-col items-center space-y-4 py-4 font-medium text-white">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    navigate("/Login");
                    setMenuOpen(false);
                  }}
                  className="w-40 px-5 py-2 rounded-lg font-medium bg-gray-700 text-white hover:bg-gray-800"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setMenuOpen(false);
                  }}
                  className="w-40 px-5 py-2 rounded-lg font-medium bg-blue-700 text-white hover:bg-blue-800"
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setMenuOpen(false);
                  }}
                  className="w-40 px-5 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-40 px-5 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700"
                >
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