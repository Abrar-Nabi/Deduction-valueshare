const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware");
const TeamMember = require("../models/TeamMember");

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await TeamMember.findById(req.user.id)
      .populate('manager', 'name') // Populate the manager's name field
      .select("-password"); // Exclude password
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user); // Send user data with populated manager name
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * ✅ Update Profile Data Route
 */
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, ohrId, band, manager } = req.body;

    let updateData = { name, ohrId, band };

    // Validate manager ID
    if (manager && mongoose.isValidObjectId(manager)) {
      updateData.manager = new mongoose.Types.ObjectId(manager);
    }

    const updatedUser = await TeamMember.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ msg: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Profile Update Error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


module.exports = router;
