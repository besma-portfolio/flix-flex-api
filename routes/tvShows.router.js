import express from 'express';
import { tvShowsController } from '../controllers';

const router = express.Router();

router.get('/popular', tvShowsController.getPopularTvShows);
router.get('/top-rated', tvShowsController.getTopRatedTvShows);
router.get('/search', tvShowsController.searchTvShows);
router.get('/:id', tvShowsController.getTvShowDetails);


export default router;