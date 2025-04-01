const Admin = require("../models/Admin");
const Manager = require("../models/Manager");
const TeamMember = require("../models/TeamMember");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
  expiresIn: "7d",
});

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;
    let role = "";

    // Check in all user collections sequentially
    if (!user) {
      user = await Admin.findOne({ email });
      if (user) role = "admin";
    }
    if (!user) {
      user = await Manager.findOne({ email });
      if (user) role = "manager";
    }
    if (!user) {
      user = await TeamMember.findOne({ email });
      if (user) role = "teamMember";
    }

    // If user is still not found, return error
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }


    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, role });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
