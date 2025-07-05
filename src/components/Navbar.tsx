import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CaterpillarLogo from "../assets/navbar-logo.png";
import { UserCircle } from "lucide-react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between bg-yellow-100 px-6 py-3 shadow-md">
      <Link to="/home">
        <img src={CaterpillarLogo} alt="Caterpillar" className="h-10" />
      </Link>

      <div className="relative">
        <UserCircle
          className="h-10 w-10 text-yellow-700 cursor-pointer hover:text-yellow-900"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
            <ul className="py-2 text-sm text-gray-700">
              <li
                className="px-4 py-2 hover:bg-yellow-50 cursor-pointer"
                onClick={() => navigate("/account")}
              >
                Account
              </li>
              <li
                className="px-4 py-2 hover:bg-yellow-50 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
