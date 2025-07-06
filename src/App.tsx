import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";
import Home from "./pages/user/Home";
import AdminPanel from "./pages/admin/Dashboard";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/dashboard" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;