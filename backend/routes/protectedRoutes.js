const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// 🔒 Protected Route: Only Team Members Can Access
// 🔒 Protected Route: Only Managers Can Access Their Team Members
router.get(
  "/manager",
  authMiddleware,
  roleMiddleware(["manager"]),
  async (req, res) => {
    try {
      // Fetch team members assigned to this manager
      const teamMembers = await TeamMember.find({ manager: req.user.id }, "-password");
      
      res.json({ 
        msg: "Welcome, Manager! You can access your assigned team members.", 
        teamMembers 
      });
    } catch (error) {
      res.status(500).json({ msg: "Error fetching team members", error: error.message });
    }
  }
);

// 🔒 Protected Route: Only Managers Can Access
// 🔒 Protected Route: Only Managers Can Access Their Team Members
router.get(
  "/manager",
  authMiddleware,
  roleMiddleware(["manager"]),
  async (req, res) => {
    try {
      // Fetch team members assigned to this manager
      const teamMembers = await TeamMember.find({ manager: req.user.id }, "-password");
      
      res.json({ 
        msg: "Welcome, Manager! You can access your assigned team members.", 
        teamMembers 
      });
    } catch (error) {
      res.status(500).json({ msg: "Error fetching team members", error: error.message });
    }
  }
);

// 🔒 Protected Route: Only Admins Can Access
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.json({ msg: "Welcome, Admin! You have full access to all users." });
  }
);

module.exports = router;
