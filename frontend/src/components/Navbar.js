import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false); // ✅ Close dropdown on logout
    navigate("/");
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Close dropdown on route change (e.g., after login)
  useEffect(() => {
    setDropdownOpen(false);
  }, [isLoggedIn, location.pathname]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/home">Deduction Value Share</Link>
      </div>

      {/* ✅ Hide User Menu on Login Page */}
      {location.pathname !== "/" && (
        <div className="user-menu" ref={dropdownRef}>
          <div className="user-icon" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <FaUserCircle size={35} color="#333" />
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <Link to="/login" className="dropdown-item">Login</Link>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
