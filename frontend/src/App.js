import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ValuePartnership from "./components/ValuePartnership";
import AdditionalBenefits from "./components/AdditionalBenefits";
import AdminDashboard from "./admin/AdminDashboard";
import AdminHome from "./admin/AdminHome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Manager from "./Manager/ManagerDashboard";
import Profile from "./TeamMember/ProfileForm";
import Targets from "./TeamMember/TargetsForm";
import ProfilePage from "./TeamMember/Profilepage";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function ProtectedRoute({ element }) {
  const { isLoggedIn } = React.useContext(AuthContext);
  return isLoggedIn ? element : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/value-partnership" element={<ProtectedRoute element={<ValuePartnership />} />} />
          <Route path="/additional-benefits" element={<ProtectedRoute element={<AdditionalBenefits />} />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminHome />} />} />
          <Route path="/manager" element={<ProtectedRoute element={<Manager />} />} />
          <Route path="/myprofile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path="/targets" element={<ProtectedRoute element={<Targets />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
