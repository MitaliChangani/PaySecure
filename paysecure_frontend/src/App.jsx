import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Register from "./Components/Register";
import Login from './Components/Login'
import Forgot from './Components/Forgot'
import Otp from './Components/Otp'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Header from "./Components/Header";
import FranchiseDs from "./Components/FranchiseDs";
import UserDs from "./Components/UserDs"


function Layout({ children }) {
  const location = useLocation();
  const hideLayout = ["/Register", "/Login"];

  return (
    <>
      {!hideLayout.includes(location.pathname) && <Header />}
      {children}
      {!hideLayout.includes(location.pathname) && <Footer />}
    </>
  );
}
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/Otp" element={<Otp />} />
          <Route path="/FranchiseDs" element={<FranchiseDs />} />
          <Route path="/UserDs" element={<UserDs />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;