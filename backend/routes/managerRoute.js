const express = require("express");
const jwt = require("jsonwebtoken");
const TeamMember = require("../models/TeamMember"); // Assuming you have a TeamMember model
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const adminOrManagerAuth = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "manager") {
    return res.status(403).json({ message: "Access denied. Admins and Managers only." });
  }
  next();
};



router.get("/team-members", authMiddleware, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      // Admin gets all team members
      const teamMembers = await TeamMember.find({}, "-password").populate("manager", "name email");
      return res.status(200).json(teamMembers);
    } else if (req.user.role === "manager") {
      // Manager gets only their assigned team members
      const teamMembers = await TeamMember.find({ manager: req.user.id }, "-password");
      return res.status(200).json(teamMembers);
    } else {
      return res.status(403).json({ msg: "Access denied: Only admins and managers can view team members" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
