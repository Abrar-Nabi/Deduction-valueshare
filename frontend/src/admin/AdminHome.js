import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Import user icon
import "./adminstyles/AdminHome.css"; // Import CSS for styling

const AdminHome = () => {
  return (
    <div className="admin-home">
      {/* ✅ Main Content */}
      <div className="container">
        <Link to="/admin-dashboard" className="box user-box">
          <FaUser className="user-icon" />
          <h3>Users</h3>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
