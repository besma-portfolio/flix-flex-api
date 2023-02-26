import mongoose from 'mongoose';

const { Schema } = mongoose;

const favoriteSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['movie', 'tv-show'],
    required: true,
  },
  overview: {
    type: String
  },
  title: String,
  name: String,
  poster_path: {
    type: String,
  },
  release_date: Date,
  first_air_date: Date,
  vote_average: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }
}, { timestamp: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
