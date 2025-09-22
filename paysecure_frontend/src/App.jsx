import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from './Components/Login'
import Forgot from './Components/Forgot'
import Otp from './Components/Otp'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Header from "./Components/Header";
import FranchiseDs from "./Components/FranchiseDs";
import UserDs from "./Components/UserDs";

function App() {
  return (
    <Router>
      <Routes>

      
        <Route path="/" element={<Header/>} />
        <Route path="/Home" element={<Home />}/>

        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/Otp" element={<Otp />} />

        <Route path="/Footer" element={<Footer />} />
        <Route path="/FranchiseDs" element={<FranchiseDs />} />
        <Route path="/UserDs" element={<UserDs />} />
    </Routes>

    </Router>
  );
}

export default App