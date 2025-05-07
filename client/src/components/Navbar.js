import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check login state whenever location changes
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    setIsLoggedIn(!!userInfo);
  }, [location]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1 style={{ color: 'white' }}>TuneTrekk</h1>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link 
            to="/" 
            className={`${styles.link} ${location.pathname === '/' ? styles.activeLink : ''}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/explore" 
            className={`${styles.link} ${location.pathname === '/explore' ? styles.activeLink : ''}`}
          >
            Explore
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`${styles.link} ${location.pathname === '/about' ? styles.activeLink : ''}`}
          >
            About
          </Link>
        </li>
        {!isLoggedIn ? (
          <>
            <li>
              <Link
                to="/login"
                className={`${styles.link} ${location.pathname === '/login' ? styles.activeLink : ''}`}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className={`${styles.link} ${location.pathname === '/register' ? styles.activeLink : ''}`}
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/accountdetails"
              className={`${styles.link} ${styles.accountBtn} ${location.pathname === '/accountdetails' ? styles.activeLink : ''}`}
            >
              My Account
            </Link>
          </li>
        )}
      </ul>
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a song"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>
    </nav>
  );
};

export default Navbar;