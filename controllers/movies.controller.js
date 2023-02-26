import { moviesService } from '../external-services';

function getPopularMovies(req, res) {
  const { page } = req.query;
  moviesService.getPopularMovies(page)
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}

function getUpcomingMovies(req, res) {
  const { page } = req.query;
  moviesService.getUpcomingMovies(page)
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}

function getMovieDetails(req, res) {
  const { id } = req.params;
  moviesService.getMovieDetails(id)
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}

function searchMovies(req, res) {
  const { query, page } = req.query;
  moviesService.searchMovies({ query, page })
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}



export default {
  getPopularMovies,
  getMovieDetails,
  getUpcomingMovies,
  searchMovies,
}