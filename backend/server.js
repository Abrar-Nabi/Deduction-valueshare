const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ Import CORS

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS (Allow frontend to communicate with backend)
app.use(cors());  // Allows all origins

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/protected", require("./routes/protectedRoutes")); // 🔒 Protected Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/team-members", require("./routes/teamMemberRoutes"));
app.use("/api/manager", require("./routes/managerRoute")); // ✅ Use the manager route
app.use("/api/targets", require("./routes/targetRoutes")); // ✅ Add target management routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
