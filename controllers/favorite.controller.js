import { favoriteService } from '../services';

function getFavorite(req, res) {
  const { userId } = req.param;
  favoriteService.getFavorite(userId)
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}

function addToFavorite(req, res) {
  const { id, category, overview, title, poster_path, release_date, vote_average } = req.body;
  const { userId } = req.param
  favoriteService.addToFavorite({ userId, id, category, overview, title, poster_path, release_date, vote_average })
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}

function removeFromFavorite(req, res) {
  const { id, category } = req.body;
  const { userId } = req.param
  favoriteService.removeFromFavorite({ userId, id, category })
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}

export default {
  getFavorite,
  addToFavorite,
  removeFromFavorite,
}