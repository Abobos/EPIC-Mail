import express from 'express';
import UserController from '../controllers/userController';
import { signup, login } from '../middlewares/userAuth';
import { trim, transformEmail } from '../helpers/specialAuth';
import authUser from '../middlewares/userReset';

const router = express.Router();

router.post('/signup', trim, transformEmail, signup, UserController.userSignUp);
router.post('/login', trim, transformEmail, login, UserController.userSignIn);
router.post('/reset', trim, transformEmail, authUser, UserController.sendResetLink);

export default router;
