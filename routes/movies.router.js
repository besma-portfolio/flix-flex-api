import express from 'express';
import { moviesController } from '../controllers';

const router = express.Router();

router.get('/popular', moviesController.getPopularMovies);
router.get('/upcoming', moviesController.getUpcomingMovies);
router.get('/search', moviesController.searchMovies);
router.get('/:id', moviesController.getMovieDetails);


export default router;