import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManagerDashboard.css";

const ManagerDashboard = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Fetch team members assigned to the logged-in manager
  const fetchTeamMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token missing.");
        setLoading(false);
        return;
      }

      const res = await axios.get("https://deduction-valueshare-backend.onrender.com/api/admin/team-members", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeamMembers(res.data);
    } catch (err) {
      setError("Failed to load team members.");
    }
    setLoading(false);
  };

  return (
    <div className="manager-dashboard">
      <h2 className="manager-dashboard-title">Manager Dashboard</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="message error">{error}</p>
      ) : (
        <>
          <h3 className="team-members-title">Your Team Members</h3>
          <ul className="team-members-list">
            <li>
              <div className="team-member-details">
                <p className="team-member-name">Name</p>
                <p className="team-member-email">Email</p>
              </div>
            </li>
            {teamMembers.length > 0 ? (
              teamMembers.map((member) => (
                <li key={member._id} className="team-member-item">

                  <div className="team-member-details">
                    <p className="team-member-name">{member.name}</p>
                    <p className="team-member-email">{member.email}</p>
                  </div>
                </li>
              ))
            ) : (
              <p>No team members found.</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default ManagerDashboard;
