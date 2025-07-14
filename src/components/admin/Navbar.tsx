import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CaterpillarLogo from "../../assets/navbar-logo.png";
import { UserCircle, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-yellow-100 px-4 py-3 shadow-md">
      <div className="flex items-center justify-between lg:justify-start lg:grid lg:grid-cols-3 lg:gap-4">
        <div className="flex items-center">
          <Link to="/admin/dashboard">
            <img src={CaterpillarLogo} alt="Caterpillar" className="h-10" />
          </Link>
        </div>

        <div className="hidden lg:flex justify-center gap-8 text-sm font-medium text-gray-800">
          <Link
            to="/admin/dashboard"
            className="hover:text-black transition-colors py-2"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/register"
            className="hover:text-black transition-colors py-2"
          >
            Vehicle Registeration
          </Link>
          <Link 
            to="/admin/registered-vehicles"
            className="hover:text-black transition-colors py-2"
          >
            Registered Vehicles
          </Link>
        </div>

        <div className="hidden lg:flex justify-end">
          <div className="relative">
            <UserCircle 
              className="h-10 w-10 text-yellow-700 cursor-pointer hover:text-yellow-900 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            />

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20">
                <ul className="py-2 text-sm text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-yellow-50 cursor-pointer transition-colors"
                    onClick={() => {
                      navigate("/admin/account");
                      setMenuOpen(false);
                    }}
                  >
                    Account
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-yellow-50 cursor-pointer transition-colors"
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="lg:hidden flex items-center gap-4">
          <UserCircle 
            className="h-8 w-8 text-yellow-700 cursor-pointer hover:text-yellow-900 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-800 hover:text-black transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-yellow-200">
          <div className="flex flex-col gap-2">
            <Link
              to="/admin/dashboard"
              className="text-gray-800 hover:text-black transition-colors py-2 px-2 rounded hover:bg-yellow-50"
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/register"
              className="text-gray-800 hover:text-black transition-colors py-2 px-2 rounded hover:bg-yellow-50"
              onClick={closeMobileMenu}
            >
              Register Vehicle
            </Link>
          </div>
        </div>
      )}

      {/* Mobile User Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute right-4 mt-2 w-40 bg-white rounded-md shadow-lg z-20">
          <ul className="py-2 text-sm text-gray-700">
            <li
              className="px-4 py-2 hover:bg-yellow-50 cursor-pointer transition-colors"
              onClick={() => {
                navigate("/admin/account");
                setMenuOpen(false);
              }}
            >
              Account
            </li>
            <li
              className="px-4 py-2 hover:bg-yellow-50 cursor-pointer transition-colors"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;