import React, { useState, useEffect } from "react";
import "../styles/ProfileInfoForm.css"; // Import the CSS file

const ProfileInfoForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ohrId: "",
    band: "",
    manager: "", // manager will contain the manager object with the name field
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Logged-in User's Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/team-members/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setFormData({
          name: data.name || "",
          email: data.email || "",
          ohrId: data.ohrId || "",
          band: data.band || "",
          manager: data.manager || "", // manager will be an object with name
        });

        setLoading(false);
      } catch (error) {
        console.error("Profile Fetch Error:", error.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle Form Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Handle Profile Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/team-members/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Profile update failed");

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Profile Update Error:", error.message);
    }
  };

  return (
    <div className="profile-form-container">
    {/* Back Button */}
    <button className="back-button" onClick={() => window.history.back()}>
        Back
      </button>
      {loading ? (
        <p className="profile-loading">Loading profile...</p>
      ) : !isEditing ? (
        // 🔹 Display Read-Only Profile View
        <div className="profile-view">
          <h2 className="profile-title">Profile Details</h2>
          <p className="profile-item"><strong>Name:</strong> {formData.name}</p>
          <p className="profile-item"><strong>Email:</strong> {formData.email}</p>
          <p className="profile-item"><strong>OHR ID:</strong> {formData.ohrId}</p>
          <p className="profile-item"><strong>Band:</strong> {formData.band}</p>
          <p className="profile-item"><strong>Manager:</strong> {formData.manager?.name || "No manager assigned"}</p>

          <button className="profile-edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      ) : (
        // 🔹 Editable Form View
        <form className="profile-edit-form" onSubmit={handleSubmit}>
          <h2 className="profile-title">Edit Profile</h2>

          <label className="profile-label">Name:</label>
          <input className="profile-input" type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label className="profile-label">Email:</label>
          <input
            className="profile-input profile-input-disabled"
            type="email"
            name="email"
            value={formData.email}
            readOnly
          />

          <label className="profile-label">OHR ID:</label>
          <input className="profile-input" type="text" name="ohrId" value={formData.ohrId} onChange={handleChange} required />

          <label className="profile-label">Band:</label>
          <input className="profile-input" type="text" name="band" value={formData.band} onChange={handleChange} required />

          <div className="profile-btn-group">
            <button className="profile-save-btn" type="submit">Save</button>
            <button className="profile-cancel-btn" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileInfoForm;
