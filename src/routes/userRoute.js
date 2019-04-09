import express from 'express';
import UserController from '../controllers/userController';
import { signup, login } from '../middlewares/userAuth';

const router = express.Router();

router.post('/signup', signup, UserController.userSignUp);
router.post('/login', login, UserController.userSignIn);

export default router;
