import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from './Components/Login'
import Forgot from './Components/Forgot'
import Otp from './Components/Otp'
<<<<<<< HEAD
import Footer from './Components/Footer'
import Home from './Components/Home'
=======
import Header from "./Components/Header";
import FranchiseDs from "./Components/FranchiseDs";
>>>>>>> 21339c205bb42dbf0ebc8614d704a64bdd90bf45

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/Home" element={<Home />} />
=======
        {/* Default route */}
        <Route path="/" element={<Header/>} />

        {/* Example: if you want to navigate using /register */}
>>>>>>> 21339c205bb42dbf0ebc8614d704a64bdd90bf45
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/Otp" element={<Otp />} />
<<<<<<< HEAD
        <Route path="/Footer" element={<Footer />} />
            </Routes>
=======
        <Route path="/FranchiseDs" element={<FranchiseDs />} />
      </Routes>
>>>>>>> 21339c205bb42dbf0ebc8614d704a64bdd90bf45
    </Router>
  );
}

export default App;