import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ searchQuery }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    try {
      if (userInfo && userInfo !== 'undefined') {
        const parsedUser = JSON.parse(userInfo);
        setUsername(parsedUser?.username || '');
      }
    } catch (error) {
      console.error('Error parsing userInfo from localStorage:', error);
      localStorage.removeItem('userInfo');
    }
  }, []);

  const goToFavourites = () => {
    navigate('/favourites');
  };

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>🌍 TuneTrekk</h1>
        <p className={styles.heroSubtitle}>Explore global music, from anywhere in the world.</p>
        {username && <p className={styles.welcomeMessage}>Welcome Back!! {username}</p>}
        {searchQuery && <p className={styles.heroSubtitle}>Searching for: {searchQuery}</p>}
        <a href="/explore" className={styles.heroButton}>Start Exploring</a>
        <button className={styles.heroButton} onClick={goToFavourites}>My Favourites</button>
      </div>
    </div>
  );
};

export default Home;
