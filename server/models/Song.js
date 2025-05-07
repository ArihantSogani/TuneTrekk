import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  genre: String,
  album: String,
  releaseDate: Date,
  rating: Number,
});

const Song = mongoose.model('Song', songSchema);

export default Song;
