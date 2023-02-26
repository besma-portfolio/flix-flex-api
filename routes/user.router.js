import express from 'express';
import { userController } from '../controllers';
import { userValidator } from '../middlewares/validators';
import { verifyToken } from "../middlewares";

const router = express.Router();

router.post('/login', userValidator.login, userController.login);
router.post('/register', userValidator.register, userController.register);
router.get('/info', verifyToken, userController.getUserInfo);

export default router;

