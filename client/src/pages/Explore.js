// explore.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./explore.module.css";
import { useLocation } from 'react-router-dom';

const Explore = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [favourites, setFavourites] = useState([]);

  const location = useLocation();
  const genres = ["Hindi", "English", "Punjabi", "Rap", "Pop", "Rock"];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const url = selectedGenre
          ? `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${selectedGenre}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`
          : `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`;

        const response = await axios.get(url);
        const trackData = response.data.tracks.track;

        if (Array.isArray(trackData)) {
          setTracks(trackData);
        } else {
          setTracks([]);
          setError("No tracks found for this genre.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tracks:", err);
        setError("Failed to fetch tracks");
        setLoading(false);
      }
    };

    fetchTracks();
  }, [selectedGenre]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(favs);
  }, []);

  const filteredTracks = searchQuery
    ? tracks.filter((track) =>
        track.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tracks;

  const addToFavourites = (track) => {
    const isAlreadyAdded = favourites.some(
      (item) => item.name === track.name && item.artist.name === track.artist.name
    );

    if (!isAlreadyAdded) {
      const updated = [...favourites, track];
      setFavourites(updated);
      localStorage.setItem("favourites", JSON.stringify(updated));
      alert(`Added "${track.name}" to favourites`);
    } else {
      alert(`"${track.name}" is already in your favourites`);
    }
  };

  const isTrackFavourited = (track) => {
    return favourites.some(
      (fav) => fav.name === track.name && fav.artist.name === track.artist.name
    );
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.exploreContainer}>
      <h2 className={styles.heading}>Explore Trending Songs</h2>

      <div className={styles.genreSelector}>
        <label>Select Genre:</label>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre.toLowerCase())}
            className={styles.genreButton}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredTracks.length === 0 ? (
          <p className={styles.error}>No tracks available</p>
        ) : (
          filteredTracks.map((track, index) => {
            const imageUrl =
              track.image?.[2]?.["#text"]?.trim() || "/default-album.png";
            const isFavourited = isTrackFavourited(track);

            return (
              <div key={index} className={styles.card}>
                <img
                  src={imageUrl}
                  alt={track.name}
                  className={styles.albumImage}
                />
                <h3 className={styles.title}>{track.name}</h3>
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
                  onClick={() => addToFavourites(track)}
                  className={`${styles.favButton} ${isFavourited ? styles.disabled : ''}`}
                  disabled={isFavourited}
                >
                  {isFavourited ? "Favourited" : "Add to Favourites"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Explore;
