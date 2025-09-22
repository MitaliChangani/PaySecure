import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from './Components/Login'
import Forgot from './Components/Forgot'
import Otp from './Components/Otp'
import Header from "./Components/Header";
import FranchiseDs from "./Components/FranchiseDs";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Header/>} />

        {/* Example: if you want to navigate using /register */}
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/Otp" element={<Otp />} />
        <Route path="/FranchiseDs" element={<FranchiseDs />} />
      </Routes>
    </Router>
  );
}

export default App;
