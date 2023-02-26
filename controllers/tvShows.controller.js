import { tvShowsService } from '../external-services';

function getPopularTvShows(req, res) {
  const { page } = req.query;
  tvShowsService.getPopularTvShows(page)
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}

function getTopRatedTvShows(req, res) {
  const { page } = req.query;
  tvShowsService.getTopRatedTvShows(page)
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}

function getTvShowDetails(req, res) {
  const { id } = req.params;
  tvShowsService.getTvShowDetails(id)
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}

function searchTvShows(req, res) {
  const { query, page } = req.query;
  tvShowsService.searchTvShows({ query, page })
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}



export default {
  getPopularTvShows,
  getTopRatedTvShows,
  getTvShowDetails,
  searchTvShows,
}