const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Manager = require("../models/Manager");
const TeamMember = require("../models/TeamMember");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Middleware to check if the user is an admin
const adminAuth = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Middleware to allow both admins and managers to access routes
const adminOrManagerAuth = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "manager") {
    return res.status(403).json({ message: "Access denied. Admins and Managers only." });
  }
  next();
};

// ✅ Add a new Manager (Only Admin)
router.post("/add-manager", authMiddleware, adminAuth, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingManager = await Manager.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ message: "Manager already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newManager = new Manager({ name, email, password: hashedPassword, role: "manager" });

    await newManager.save();
    res.status(201).json({ message: "Manager added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Add a new Team Member (Only Admin)
router.post("/add-team-member", authMiddleware, adminAuth, async (req, res) => {
  try {
    const { name, email, password, managerId, ohrId, band } = req.body;

    // Check if the team member already exists
    const existingTeamMember = await TeamMember.findOne({ email });
    if (existingTeamMember) {
      return res.status(400).json({ message: "Team Member already exists" });
    }

    // Check if ohrId already exists
    const existingOhrId = await TeamMember.findOne({ ohrId });
    if (existingOhrId) {
      return res.status(400).json({ message: "OHR ID already exists" });
    }

    // Validate managerId is an ObjectId
    if (!mongoose.Types.ObjectId.isValid(managerId)) {
      return res.status(400).json({ message: "Invalid manager ID" });
    }

    // Check if the manager exists
    const manager = await Manager.findById(managerId);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    // Hash the password and create the new team member
    const hashedPassword = await bcrypt.hash(password, 10);
    const newTeamMember = new TeamMember({
      name,
      email,
      password: hashedPassword,
      role: "team_member",
      manager: managerId,
      ohrId,
      band
    });

    await newTeamMember.save();
    res.status(201).json({ message: "Team Member added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get All Managers (Only Admin)
router.get("/managers", authMiddleware, adminOrManagerAuth, async (req, res) => {
  try {
    const managers = await Manager.find({}, "-password"); // Exclude password field
    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get All Team Members (Both Admin and Manager)
// ✅ Get All Team Members (Both Admin and Manager, but managers can only see their assigned team members)
router.get("/team-members", authMiddleware, adminOrManagerAuth, async (req, res) => {
  try {
    // If the user is a manager, only fetch team members assigned to them
    const query = req.user.role === "manager" ? { manager: req.user.id } : {};

    // Fetch team members based on the query
    const teamMembers = await TeamMember.find(query, "-password").populate("manager", "name email");
    
    res.status(200).json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router;
