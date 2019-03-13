import express from 'express';
import UserControllers from '../controllers/usersControllers';

const router = express.Router();

router.post('/signup', UserControllers.userSignUp);
router.post('/login', UserControllers.userSignIn);

export default router;
