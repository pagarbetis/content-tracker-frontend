import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Channels from './pages/Channels';
import Contents from './pages/Contents';
import Dashboard from './pages/Dashboard';
import SidebarLayout from './components/SidebarLayout';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Pages tanpa Sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* App Pages dengan Sidebar & Top Header */}
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/contents" element={<Contents />} />
        </Route>
      </Routes>
    </Router>
  );
}