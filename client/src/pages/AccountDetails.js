import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './AccountDetails.module.css';

const API_BASE_URL = 'http://localhost:5000';

const AccountDetails = () => {
  const navigate = useNavigate();
  
  // State for password change form
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // User data state
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userInfoStr = localStorage.getItem('userInfo');
    if (!userInfoStr) {
      // Redirect to login if not logged in
      navigate('/login');
      return;
    }

    try {
      // Parse user data - should be directly accessible now (not nested)
      const userInfo = JSON.parse(userInfoStr);
      setUserData(userInfo);
      setLoading(false);
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
      localStorage.removeItem('userInfo'); // Clear invalid data
      navigate('/login'); // Redirect to login
    }
  }, [navigate]);

  // Handle password change form submission
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication token missing. Please log in again.');
        return;
      }

      // Send password change request to server
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/change-password`,
        {
          currentPassword,
          newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data) {
        // Update user data in state and localStorage with new password
        const updatedUserData = {
          ...userData,
          password: newPassword
        };
        localStorage.setItem('userInfo', JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
        
        // Show success message
        setSuccess('Password updated successfully');
        
        // Reset form
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        // Hide form after successful update
        setTimeout(() => {
          setShowPasswordForm(false);
          setSuccess('');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    navigate('/login');
  };

  // If data is still loading
  if (loading) {
    return <div className={styles.loading}>Loading account details...</div>;
  }

  // If user data not found
  if (!userData) {
    return <div className={styles.error}>Unable to load account details. Please log in again.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Account Details</h1>
        <p className={styles.subtitle}>Welcome back, {userData.username}!</p>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        
        <div className={styles.detailsContainer}>
          <div className={styles.detailItem}>
            <div className={styles.label}>Username:</div>
            <div className={styles.value}>{userData.username}</div>
          </div>
          
          <div className={styles.detailItem}>
            <div className={styles.label}>Email:</div>
            <div className={styles.value}>{userData.email}</div>
          </div>
          
          <div className={styles.detailItem}>
            <div className={styles.label}>Password:</div>
            <div className={styles.value}>{userData.password?.toUpperCase() || '********'}</div>
          </div>
          
          <div className={styles.detailItem}>
            <div className={styles.label}>Account Created:</div>
            <div className={styles.value}>
              {userData.createdAt
                ? new Date(userData.createdAt).toLocaleDateString()
                : 'Not available'}
            </div>
          </div>
        </div>
        
        {!showPasswordForm ? (
          <button
            className={styles.button}
            onClick={() => setShowPasswordForm(true)}
          >
            Change Password
          </button>
        ) : (
          <div className={styles.passwordChangeContainer}>
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordChange}>
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={styles.input}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
                required
                minLength="6"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
                required
              />
              <div className={styles.buttonGroup}>
                <button type="button" className={styles.cancelButton} onClick={() => setShowPasswordForm(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveButton}>
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}
        
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;