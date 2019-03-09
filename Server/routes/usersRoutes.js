import express from 'express';
import UserControllers from '../controllers/usersControllers';

const router = express.Router();

router.post('/signup', UserControllers.userSignUp);

export default router;
