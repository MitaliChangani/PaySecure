import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from './Components/Login'
import Forgot from './Components/Forgot'
import Otp from './Components/Otp'
import Footer from './Components/Footer'
import Home from './Components/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/Otp" element={<Otp />} />
        <Route path="/Footer" element={<Footer />} />
            </Routes>
    </Router>
  );
}

export default App;