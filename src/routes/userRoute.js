import express from 'express';
import UserController from '../controllers/userController';
import { signup, login } from '../middlewares/userAuth';
import { trim, transformEmail } from '../helpers/specialAuth';

const router = express.Router();

router.post('/signup', trim, transformEmail, signup, UserController.userSignUp);
router.post('/login', trim, transformEmail, login, UserController.userSignIn);

export default router;
