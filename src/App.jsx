import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Channels from './pages/Channels';
import Contents from './pages/Contents';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/channels" element={<Channels />} />
        <Route path="/contents" element={<Contents />} />
      </Routes>
    </Router>
  );
}