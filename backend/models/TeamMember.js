const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["team_member"], required: true, default: "team_member" },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "Manager", required: true }, // Links team member to a manager
  ohrId: { type: String, default: "" }, 
  band: { type: String, default: "" } 
});

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

module.exports = TeamMember;
