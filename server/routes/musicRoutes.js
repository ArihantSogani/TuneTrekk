// server/routes/musicRoutes.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/recommendations', async (req, res) => {
  try {
    const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
      params: {
        method: 'chart.gettoptracks',
        api_key: process.env.LASTFM_API_KEY,
        format: 'json',
        limit: 10,
      },
    });

    const tracks = response.data.tracks.track.map((track) => ({
      name: track.name,
      artist: track.artist.name,
      image: track.image[2]['#text'], // Medium size image
      url: track.url,
    }));

    res.json(tracks);
  } catch (error) {
    console.error('Last.fm API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

export default router;
