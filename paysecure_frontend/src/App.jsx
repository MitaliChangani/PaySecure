import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

import Register from "./Components/Register";
import Login from './Components/Login'
import ForgotResetPassword from './Components/ForgotResetPassword';
import Otp from './Components/Otp'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Header from "./Components/Header";
import FranchiseDs from "./Components/FranchiseDs";
import UserDs from "./Components/UserDs"

axios.defaults.withCredentials = true; 

axios.interceptors.request.use((config) => {
  const csrfToken = document.cookie.split("; ").find(row => row.startsWith("csrftoken="))?.split("=")[1];
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

function Layout({ children }) {
  const location = useLocation();
  const hideLayout = ["/Register", "/Login", "/ForgotResetPassword", "/Otp"];

  return (
    <>
      {!hideLayout.includes(location.pathname) && <Header />}
      {children}
      {!hideLayout.includes(location.pathname) && <Footer />}
    </>
  );
}
function App() {

  useEffect(() => {
    axios.get("http://localhost:8000/api/csrf/", { withCredentials: true });
  }, []);


  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/forgot-reset-password" element={<ForgotResetPassword />} />
          <Route path="/Otp" element={<Otp />} />
          <Route path="/FranchiseDs" element={<FranchiseDs />} />
          <Route path="/UserDs" element={<UserDs />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;