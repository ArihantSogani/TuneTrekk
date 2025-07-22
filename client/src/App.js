import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import AccountDetails from './pages/AccountDetails';
import Navbar from './components/Navbar';
import Favourites from './pages/favourite';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('userInfo');
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// Guest route component (only accessible when not logged in)
const GuestRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('userInfo');
  return !isLoggedIn ? children : <Navigate to="/" />;
};

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Navbar onSearch={handleSearch} />
      <Routes>
        {/* Protected routes - only accessible when logged in */}
        <Route path="/" element={<ProtectedRoute><Home searchQuery={searchQuery} /></ProtectedRoute>} />
        <Route path="/explore" element={<ProtectedRoute><Explore searchQuery={searchQuery} /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/favourites" element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
        <Route path="/accountdetails" element={<ProtectedRoute><AccountDetails /></ProtectedRoute>} />

        {/* Guest routes - only accessible when not logged in */}
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
      </Routes>
    </Router>
  );
}

export default App;