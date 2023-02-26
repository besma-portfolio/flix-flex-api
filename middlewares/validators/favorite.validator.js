import { validator } from '../../helpers';

const addToFavorite = async (req, res, next) => {
  const validationRule = {
    id: 'required|integer',
    category: 'required|string|in:movie,tv-show',
    overview: 'string',
    title: 'required_if:category,movie|string',
    name: 'required_if:category,tv-show|string',
    poster_path: 'string',
    release_date: 'string',
    first_air_date: 'string',
    vote_average: 'required|numeric',
  };

  await validator.validate(req.body, validationRule, {}, (errors, status) => {
    if (!status) {
      res.status(400)
        .send(errors);
    } else {
      next();
    }
  });
};

const removeFromFavorite = async (req, res, next) => {
  const validationRule = {
    id: 'required|integer',
    category: 'required|string|in:movie,tv-show',
  };

  await validator.validate(req.body, validationRule, {}, (errors, status) => {
    if (!status) {
      res.status(400)
        .send(errors);
    } else {
      next();
    }
  });
};

export default {
  addToFavorite,
  removeFromFavorite,
};
