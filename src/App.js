// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import TripPlanner from './pages/TripPlanner';

function App() {
  const isLoggedIn = false; // Replace with your auth logic

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/planner" replace /> : <Login />}
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
