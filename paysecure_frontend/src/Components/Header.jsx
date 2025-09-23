import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/"); 
  };

  const handleRegister = () => {
    // After successful registration, mark user as logged in
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/"); // optional: redirect to home after register
  };

  return (
    <header className="w-full bg-black shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-white">Pay Secure</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 font-medium text-white">
          <a href="/" className="hover:text-gray-300">Home</a>
          <a href="/about" className="hover:text-gray-300">About Us</a>
          <a href="/features" className="hover:text-gray-300">Features</a>
        </nav>

        {/* Desktop Buttons */}
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
                onClick={handleRegister} // <-- registration sets user as logged in
                className="px-5 py-2 rounded-lg font-medium bg-blue-700 text-white hover:bg-blue-800"
              >
                Create Account
              </button>
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

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-800"
        >
          {menuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black shadow-md border-t border-gray-800">
          <nav className="flex flex-col items-center space-y-4 py-4 font-medium text-white">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="/about" className="hover:text-gray-300">About Us</a>
            <a href="/features" className="hover:text-gray-300">Features</a>

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
                    handleRegister(); // registration sets user as logged in
                    setMenuOpen(false);
                  }}
                  className="w-40 px-5 py-2 rounded-lg font-medium bg-blue-700 text-white hover:bg-blue-800"
                >
                  Create Account
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-40 px-5 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
