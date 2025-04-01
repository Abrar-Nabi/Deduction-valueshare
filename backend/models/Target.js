const mongoose = require("mongoose");

const targetSchema = new mongoose.Schema({
  teamMember: { type: mongoose.Schema.Types.ObjectId, ref: "TeamMember", required: true },
  quarter: { type: String, enum: ["Q1", "Q2", "Q3", "Q4"], required: true },
  target: { type: Number, required: true },
  targetAchieved: { type: Number, default: 0 }, // To store the achieved target value
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Target = mongoose.model("Target", targetSchema);

module.exports = Target;
