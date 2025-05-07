// client/src/pages/About/About.jsx
import React, { useState } from 'react';
import styles from './About.module.css';

const About = () => {
  const [rating, setRating] = useState(null);

  const handleRating = (value) => {
    setRating(value);
    alert(`You rated us ${value} out of 5!`);
  };

  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.heading}>About TuneTrekk</h1>
      <p className={styles.paragraph}>
        TuneTrekk is more than just a music app. It's your personalized music explorer, offering you a journey beyond the familiar hits. Whether you want to discover global trends, explore new genres, or curate your favorite tracks, TuneTrekk is here to enhance your music experience.
      </p>
      <p className={styles.paragraph}>
        By integrating Last.fm's top charts with AI-powered recommendations, TuneTrekk tailors its suggestions to match your musical preferences, making every session a fresh adventure.
      </p>
      <p className={styles.paragraph}>
        Developed with ❤️ and cutting-edge technology: React, Express, MongoDB, and APIs that bring you closer to the music you love.
      </p>

      <div className={styles.ratingBar}>
        <p className={styles.ratingPrompt}>How would you rate your experience with TuneTrekk?</p>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              className={`${styles.starButton} ${rating >= star ? styles.selected : ''}`}
            >
              ⭐
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
