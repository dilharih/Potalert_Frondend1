import React, { useState } from "react";
import "./App.css";

import HomeMap from "./HomeMap";
import AuthPage from "./AuthPage";
import UserDashboard from "./UserDashboard";
import OfficerDashboard from "./OfficerDashboard";
import FireForceDashboard from "./FireForceDashboard";
import KsebDashboard from "./KsebDashboard";
import AdminDashboard from "./AdminDashboard";

function App() {
  const [currentView, setCurrentView] = useState("map");
  const [userRole, setUserRole] = useState(null);

  // 🔐 Open login
  const handleSignIn = () => {
    setCurrentView("auth");
  };

  // 🔐 Login success → ALWAYS go back to map
  const handleLogin = (role) => {
    setUserRole(role);
    setCurrentView("map"); // ✅ THIS IS CRITICAL
  };

  // ⬅️ Back to map from dashboards
  const handleBackToMap = () => {
    setCurrentView("map");
  };

  // 🔓 Logout
  const handleLogout = () => {
    setUserRole(null);
    setCurrentView("map");
  };

  // 👤 Profile button click
  const handleProfileClick = () => {
    if (!userRole) return;
    setCurrentView(userRole);
  };

  // 🔀 VIEW SWITCH
  switch (currentView) {
    case "map":
      return (
        <HomeMap
          onSignIn={handleSignIn}
          onProfileClick={handleProfileClick}
          userRole={userRole}
        />
      );

    case "auth":
      return <AuthPage onLogin={handleLogin} />;

    case "user":
      return (
        <UserDashboard
          onLogout={handleLogout}
          onBackToMap={handleBackToMap}
        />
      );

    case "officer":
      return (
        <OfficerDashboard
          onLogout={handleLogout}
          onBackToMap={handleBackToMap}
        />
      );

    case "fire":
      return (
        <FireForceDashboard
          onLogout={handleLogout}
          onBackToMap={handleBackToMap}
        />
      );

    case "kseb":
      return (
        <KsebDashboard
          onLogout={handleLogout}
          onBackToMap={handleBackToMap}
        />
      );

    case "admin":
      return (
        <AdminDashboard
          onLogout={handleLogout}
          onBackToMap={handleBackToMap}
        />
      );

    default:
      return (
        <HomeMap
          onSignIn={handleSignIn}
          onProfileClick={handleProfileClick}
          userRole={userRole}
        />
      );
  }
}

export default App;
