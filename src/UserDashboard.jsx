import React, { useState } from 'react';
import './App.css';

function UserDashboard({ onLogout, onBackToMap }) {
    const [showMenu, setShowMenu] = useState(false);

    // Reports data (temporary – later from Firestore)
    const reports = [
        { id: "Pothole : 8", status: "Pending", location: "24.128,71.543" },
        { id: "Pothole : 7", status: "Repaired", location: "18.768,56.873" },
        { id: "Pothole : 6", status: "Repaired", location: "10.042,6.193" }
    ];

    const handleLogout = () => {
        onLogout();
    };

    return (
        <div className="app">
            <div className="mobile-simulation">
                <div className="dashboard">

                    {/* 🔝 HEADER */}
                    <div className="header">

                        {/* ⬅️ Back to Map */}
                        <button
                            className="back-to-map-btn"
                            onClick={onBackToMap}
                        >
                            ← Map
                        </button>

                        {/* Profile & Logout */}
                        <div className="profile-container">
                            <div
                                className="avatar"
                                onClick={() => setShowMenu(!showMenu)}
                                style={{ cursor: 'pointer' }}
                            ></div>

                            {showMenu && (
                                <div className="profile-dropdown">
                                    <button
                                        className="logout-btn"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Greeting */}
                        <div className="greeting">
                            <span className="greeting-text">Hi, Username</span>
                        </div>
                    </div>

                    {/* 📊 STATS */}
                    <div className="stats-section">
                        <div className="stat-card full-width">
                            <span className="stat-label">Reward Points</span>
                            <span className="stat-value">50</span>
                        </div>

                        <div className="stat-row">
                            <div className="stat-card square">
                                <span className="stat-label-small">Reported</span>
                                <span className="stat-value-large">8</span>
                            </div>
                            <div className="stat-card square">
                                <span className="stat-label-small">Repaired</span>
                                <span className="stat-value-large">5</span>
                            </div>
                        </div>
                    </div>

                    {/* 📄 MY REPORTS */}
                    <div className="reports-section">
                        <h2 className="section-title">My Reports</h2>

                        <div className="reports-container">
                            <div className="reports-list">
                                {reports.map((report, index) => (
                                    <div key={index} className="report-item">
                                        <div className="report-header">
                                            <span className="report-id">{report.id}</span>
                                            <span
                                                className={`report-status ${report.status.toLowerCase()}`}
                                            >
                                                {report.status}
                                            </span>
                                        </div>

                                        <div className="report-location">
                                            <svg
                                                className="location-icon"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                                                    fill="#666"
                                                />
                                            </svg>
                                            <span className="location-text">
                                                {report.location}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="reports-footer">
                                <button className="view-more-btn">
                                    Click To View More
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
