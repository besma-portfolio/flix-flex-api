import db from '../models';

async function getFavorite(userId) {
  const favorite = await db.Favorite.find({ user: userId }).exec()
    .catch((err) => {
      console.log(err);
      throw { code: (500), error: 'internal_error' };
    });
  return favorite;
}

async function addToFavorite({ userId, id, category, overview, title, poster_path, release_date, vote_average }) {
  const newFavorite = new db.Favorite({ user: userId, id, category, overview, title, poster_path, release_date, vote_average });
  const addedArticle = await newFavorite.save().catch((error) => {
    console.log(error);
    throw { code: 500, error: 'internal_error' };
  });
  return addedArticle;
}

async function removeFromFavorite({ userId, id, category }) {
  return db.Favorite.findOneAndDelete({ user: userId, id, category }).catch((error) => {
    console.log(error);
    throw { code: 500, error: 'internal_error' };
  });
}

export default {
  getFavorite,
  addToFavorite,
  removeFromFavorite,
};
