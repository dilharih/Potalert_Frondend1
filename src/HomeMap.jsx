import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "./App.css";

import { auth } from "./services/firebase";
import { createPothole } from "./services/potholes";

function HomeMap({ onSignIn, onProfileClick, userRole }) {
  // 🔥 FORCE map height
  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: 9.9312,
    lng: 76.2673,
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
  };

  const handleReportPothole = async () => {
    if (!auth.currentUser) {
      alert("Please sign in to report a pothole");
      onSignIn();
      return;
    }

    try {
      await createPothole({
        lat: center.lat,
        lng: center.lng,
        severity: "high",
        description: "User reported pothole",
        reportedBy: auth.currentUser.uid,
      });

      alert("✅ Pothole reported successfully");
    } catch (error) {
      console.error("Error reporting pothole:", error);
      alert("❌ Failed to report pothole");
    }
  };

  return (
    <div className="mobile-simulation" style={{ position: "relative" }}>
      
      {/* 🗺️ MAP LAYER */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0, // map at bottom
        }}
      >
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            options={mapOptions}
          />
        </LoadScript>
      </div>

      {/* 🔍 SEARCH UI (ABOVE MAP) */}
      <div className="map-search-container" style={{ zIndex: 2 }}>
        <div className="map-search-box">
          <button className="map-menu-btn">☰</button>
          <input
            className="map-search-input"
            placeholder="Search Google Maps"
          />
          <button className="map-search-btn">🔍</button>
          <div className="map-divider"></div>
          <button className="map-directions-btn">➤</button>
        </div>
      </div>

      {/* 👤 PROFILE BUTTON (TOP RIGHT) */}
      <div className="map-signin-container" style={{ zIndex: 2 }}>
        <button
          className="map-signin-btn"
          onClick={userRole ? onProfileClick : onSignIn}
          aria-label="Profile"
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
            <path
              d="M4 18c0-3.314 2.686-6 6-6s6 2.686 6 6"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      {/* 🚩 REPORT BUTTON (BOTTOM CENTER) */}
      <div className="map-action-container" style={{ zIndex: 2 }}>
        <button className="map-report-btn" onClick={handleReportPothole}>
          <span className="report-icon">🚩</span>
          <span className="report-text">Report Pothole</span>
        </button>
      </div>
    </div>
  );
}

export default HomeMap;
