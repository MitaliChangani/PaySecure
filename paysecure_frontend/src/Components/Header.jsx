import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Menu } from "lucide-react";

export default function Header() {
  // login state (default: false → not logged in)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const events = ()=>{
    navigate("/Register")
  }
  const eventss = ()=>{
    navigate("/Login")
  }
  
  const handleLogin = () => {
    setIsLoggedIn(true); // simulate login
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // simulate logout
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png" // replace with your logo path
            alt="Logo"
            className="h-8 w-8"
          />
          <h1 className="text-xl font-bold text-blue-900">ONE UPI</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6 font-medium text-gray-800">
          <a href="#" className="hover:text-blue-700">Home</a>
          <a href="#" className="hover:text-blue-700">About Us</a>
          <a href="#" className="hover:text-blue-700">Features</a>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {!isLoggedIn ? (
            <>
              <button
                onClick={eventss}
                className="px-5 py-2 rounded-lg font-medium bg-gray-600 text-white hover:bg-gray-700"
              >
                Login
              </button>
              <a
                href="/Register"
                onClick={events}
                className="px-5 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Create Account
              </a>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
