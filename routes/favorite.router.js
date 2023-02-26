import express from 'express';
import { favoriteController } from '../controllers';
import { favoriteValidator } from '../middlewares/validators';

const router = express.Router();

router.get('/get_all', favoriteController.getFavorite);
router.post('/add', favoriteValidator.addToFavorite, favoriteController.addToFavorite);
router.post('/remove', favoriteValidator.removeFromFavorite, favoriteController.removeFromFavorite);

export default router;
