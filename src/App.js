// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import TripPlanner from './pages/TripPlanner';
import Dashboard from './pages/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to appropriate page based on auth status */}
        <Route 
          path="/" 
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/home" replace />
          } 
        />

        {/* Public routes */}
        <Route path="/home" element={<Home />} />
        
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/planner"
          element={
            isLoggedIn ? <TripPlanner /> : <Navigate to="/login" replace />
          }
        />

        <Route path="*" element={<h2>404 – Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
