import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminstyles/AdminDashboard.css";

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "manager",
    managerId: "",
    ohrId: "",
    band: "",
  });

  const [managers, setManagers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchManagers();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.");
        return;
      }
      const res = await axios.get("http://localhost:5000/api/admin/team-members", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError("Failed to load users.");
    }
  };

  const fetchManagers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.");
        return;
      }
      const res = await axios.get("http://localhost:5000/api/admin/managers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setManagers(res.data);
    } catch (err) {
      setError("Failed to load managers.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const endpoint =
        formData.role === "manager"
          ? "http://localhost:5000/api/admin/add-manager"
          : "http://localhost:5000/api/admin/add-team-member";

      const data =
        formData.role === "manager"
          ? { name: formData.name, email: formData.email, password: formData.password }
          : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            managerId: formData.managerId || null,
            ohrId: formData.ohrId,
            band: formData.band,
          };

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token missing.");
        setLoading(false);
        return;
      }

      await axios.post(endpoint, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("User added successfully!");
      setFormData({ name: "", email: "", password: "", role: "manager", managerId: "", ohrId: "", band: "" });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding user.");
    }
    setLoading(false);
  };

  return (
    <div className="admin-dashboard">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>
       {/* Back Button */}
       <button className="back-button" onClick={() => window.history.back()}>
        Back
      </button>
      <button className="toggle-form-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add User"}
      </button>

      {showForm && (
        <form className="user-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
          {formData.role === "team_member" && (
            <>
              <input
                type="text"
                name="ohrId"
                placeholder="OHR ID"
                value={formData.ohrId}
                onChange={handleChange}
                className="form-input"
                required
              />
              <input
                type="text"
                name="band"
                placeholder="Band"
                value={formData.band}
                onChange={handleChange}
                className="form-input"
                required
              />
              <select
                name="managerId"
                value={formData.managerId}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select Manager</option>
                {managers.map((manager) => (
                  <option key={manager._id} value={manager._id}>
                    {manager.name} ({manager.email})
                  </option>
                ))}
              </select>
            </>
          )}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-select"
          >
            <option value="manager">Manager</option>
            <option value="team_member">Team Member</option>
          </select>

          <button type="submit" disabled={loading} className="form-submit-button">
            {loading ? "Submitting..." : "Add User"}
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}

      <h3 className="list-title">Users List</h3>
      <ul className="user-list">
      <li className="user-item"><span>Name</span> <span>Email</span> <span>Manager</span> <span>Band</span></li>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id} className="user-item">
              <span>{user.name} </span> <span>{user.email}</span>
              <span>{user.manager && `Manager: ${user.manager.name}`}</span>
              <span>{user.band}</span>
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>

      <h3 className="list-title">Managers List</h3>
      <ul className="manager-list">
      <li className="user-item"><span>Name</span> <span>Email</span> </li>
        {managers.length > 0 ? (
          managers.map((manager) => (
            <li key={manager._id} className="manager-item">
            <span> {manager.name} </span>    <span>{manager.email}</span>
            </li>
          ))
        ) : (
          <p>No managers found.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminDashboard;
