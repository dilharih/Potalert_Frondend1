import React, { useState } from 'react';
import './App.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./services/firebase";


function AuthPage({ onLogin }) {
    const [userType, setUserType] = useState('citizen'); // 'citizen' or 'official'
    const [isSignup, setIsSignup] = useState(false);

    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [officerId, setOfficerId] = useState('');
    const [department, setDepartment] = useState('PWD');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userType === 'official') {
            // Field Official Login
            if (department === 'PWD') {
                onLogin('officer');
            } else if (department === 'Fire Force') {
                onLogin('fire');
            } else if (department === 'KSEB') {
                onLogin('kseb');
            }
        } else {
            // Citizen/Admin Login
            if (email === 'admin@test.com') {
                onLogin('admin');
            } else {
                onLogin('user');
            }
        }
    };

    return (
        <div className="app">
            <div className="mobile-simulation">
                <div className="dashboard-content">
                    <div className="auth-container">
                        {/* Logo/Title */}
                        <div className="auth-header">
                            <h1 className="auth-title">PotAlert</h1>
                            <p className="auth-subtitle">Report. Track. Fix.</p>
                        </div>

                        {/* Role Switcher */}
                        <div className="role-switcher">
                            <button
                                className={`role-tab ${userType === 'citizen' ? 'active' : ''}`}
                                onClick={() => {
                                    setUserType('citizen');
                                    setIsSignup(false);
                                }}
                            >
                                Citizen / Admin
                            </button>
                            <button
                                className={`role-tab ${userType === 'official' ? 'active' : ''}`}
                                onClick={() => {
                                    setUserType('official');
                                    setIsSignup(false);
                                }}
                            >
                                Field Official
                            </button>
                        </div>

                        {/* Login Form */}
                        <form className="auth-form" onSubmit={handleSubmit}>
                            {userType === 'citizen' ? (
                                // Citizen/Admin Form
                                <>
                                    {isSignup && (
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="auth-input"
                                                placeholder="Full Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="auth-input"
                                            placeholder="Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="auth-input"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="auth-button">
                                        {isSignup ? 'Create Account' : 'Login'}
                                    </button>
                                    <button
                                        type="button"
                                        className="auth-link"
                                        onClick={() => setIsSignup(!isSignup)}
                                    >
                                        {isSignup ? 'Already have an account? Login' : 'New here? Create Account'}
                                    </button>
                                </>
                            ) : (
                                // Field Official Form
                                <>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="auth-input"
                                            placeholder="Officer ID"
                                            value={officerId}
                                            onChange={(e) => setOfficerId(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="auth-input"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select
                                            className="auth-input auth-select"
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                            required
                                        >
                                            <option value="PWD">PWD (Public Works)</option>
                                            <option value="Fire Force">Fire Force</option>
                                            <option value="KSEB">KSEB (Electricity)</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="auth-button">
                                        Login to Dashboard
                                    </button>
                                </>
                            )}
                        </form>

                        {/* Demo Credentials Hint */}
                        <div className="demo-hint">
                            <p className="demo-text">Demo: admin@test.com or any department</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
