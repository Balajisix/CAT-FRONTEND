import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";
import Home from "./pages/user/Home";
import AdminPanel from "./pages/admin/Dashboard";
import RegisterVehicle from "./pages/admin/Register";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/dashboard" element={<AdminPanel />} />
        <Route path="/admin/register" element={<RegisterVehicle />} />
      </Routes>
    </Router>
  );
}

export default App;