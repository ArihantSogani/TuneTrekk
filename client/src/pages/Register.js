import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css';

const API_BASE_URL = 'http://localhost:5000';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Sending registration request to:', `${API_BASE_URL}/api/auth/register`);
      console.log('With data:', { username, email, password: '***' });

      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        email,
        password,
      });

      const data = response.data;
      console.log('Registration response:', data);

      // ✅ Do NOT store token or user data here
      alert('Registration successful! Please log in.');

      // ✅ Redirect to login page
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response) {
        setError(err.response.data?.message || 'Registration failed. Please try again.');
      } else if (err.request) {
        setError('No response from server. Please check your connection and try again.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.card}>
        <h2 className={styles.title}>Register for TuneTrekk</h2>
        <p className={styles.linkText}>Create an account to start listening to music from anywhere!</p>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            minLength="6"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
            minLength="6"
          />
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className={styles.linkText}>
          Already have an account? <a href="/login" className={styles.link}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
