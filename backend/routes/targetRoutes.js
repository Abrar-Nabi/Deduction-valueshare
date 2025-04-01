const express = require("express");
const router = express.Router();
const Target = require("../models/Target"); // Target model
const TeamMember = require("../models/TeamMember"); // TeamMember model

// Create or Update Target
router.post("/update-target", async (req, res) => {
  const { teamMemberId, quarter, target, targetAchieved } = req.body;

  try {
    // Find the team member
    const teamMember = await TeamMember.findById(teamMemberId);
    if (!teamMember) return res.status(404).json({ message: "Team member not found" });

    // Check if a target already exists for this quarter
    let targetData = await Target.findOne({ teamMember: teamMemberId, quarter });
    
    if (targetData) {
      // Update existing target data
      targetData.target = target;
      targetData.targetAchieved = targetAchieved;
      targetData.updatedAt = Date.now();
      await targetData.save();
      return res.status(200).json({ message: "Target updated successfully", targetData });
    } else {
      // Create new target data
      const newTarget = new Target({
        teamMember: teamMemberId,
        quarter,
        target,
        targetAchieved
      });
      await newTarget.save();
      return res.status(201).json({ message: "Target created successfully", newTarget });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Get Targets for a specific team member
router.get("/:teamMemberId", async (req, res) => {
  const { teamMemberId } = req.params;

  try {
    const targets = await Target.find({ teamMember: teamMemberId });
    if (!targets) return res.status(404).json({ message: "Targets not found" });

    res.status(200).json(targets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
  