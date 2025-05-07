import React, { useEffect, useState } from 'react';
import styles from './favourites.module.css';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(favs);
  }, []);

  const removeFromFavourites = (track) => {
    const updatedFavourites = favourites.filter(
      (item) => item.name !== track.name || item.artist.name !== track.artist.name
    );
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    alert(`Removed "${track.name}" from favourites`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🎶 My Favourite Songs</h2>
      {favourites.length === 0 ? (
        <p className={styles.message}>You haven’t added any favourites yet.</p>
      ) : (
        <div className={styles.grid}>
          {favourites.map((track, index) => (
            <div key={index} className={styles.card}>
              <img
                src={
                  track.image && track.image[2]?.['#text']
                    ? track.image[2]['#text']
                    : '/default-album.png'
                }
                alt={track.name}
                className={styles.albumImage}
              />
              <h3 className={styles.trackName}>{track.name}</h3>
              <p className={styles.artist}>{track.artist.name}</p>
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Listen on Last.fm
              </a>
              <button
                className={styles.removeButton}
                onClick={() => removeFromFavourites(track)}
              >
                Remove from Favourites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
