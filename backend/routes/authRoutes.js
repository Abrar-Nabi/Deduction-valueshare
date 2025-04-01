const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Manager = require("../models/Manager");
const TeamMember = require("../models/TeamMember"); // ✅ Import missing model

const express = require("express");
const router = express.Router();

// ✅ Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ Universal Login Route for All Users
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = null;
    let role = "";

    // 🔎 Search across all models 
    user = await Admin.findOne({ email });
    if (user) role = "admin";

    if (!user) {
      user = await Manager.findOne({ email });
      if (user) role = "manager";
    }

    if (!user) {
      user = await TeamMember.findOne({ email });
      if (user) role = "teamMember";
    }

    // ❌ If no user found
    if (!user) return res.status(404).json({ msg: "User not found" });

    // 🔑 Compare password (plaintext vs hashed)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid password" });

    // 🔐 Generate Token
    const token = generateToken(user);
    res.json({ token, role, msg: "Login successful" });

  } catch (err) {
    console.error("Login error:", err); // ✅ Log error for debugging
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
