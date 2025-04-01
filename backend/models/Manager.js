const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["manager"], required: true, default: "manager" }
});

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
