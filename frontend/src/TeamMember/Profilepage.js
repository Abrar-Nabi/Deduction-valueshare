import { Link } from "react-router-dom";
import { FaUserAlt, FaBullseye } from "react-icons/fa"; // Import relevant icons
import "../styles/ProfilePage.css"; // Add some styling

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <h2>Profile Management</h2>\
      {/* Back Button */}
      <button className="back-button" onClick={() => window.history.back()}>
        Back
      </button>

      <div className="profile-boxes">
        {/* Box for Profile Information */}
        <Link to="/myprofile" className="profile-box">
          <div className="box-content">
            <FaUserAlt className="profile-icon" /> {/* Profile Icon */}
            <h3>Profile Information</h3>
          </div>
        </Link>

     
      </div>
    </div>
  );
};

export default ProfilePage;
