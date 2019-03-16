import express from 'express';
import UserControllers from '../controllers/usersControllers';
import { signup, login } from '../middlewares/validateUserDetails';

const router = express.Router();

router.post('/signup', signup, UserControllers.userSignUp);
router.post('/login', login, UserControllers.userSignIn);

export default router;
