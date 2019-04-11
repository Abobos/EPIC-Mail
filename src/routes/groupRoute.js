import express from 'express';
import groupController from '../controllers/groupController';
import { verifyToken } from '../middlewares/tokenHandler';
import groupAuth from '../middlewares/groupAuth';

const router = express.Router();

router.post('/groups', verifyToken, groupAuth, groupController.createGroup);

export default router;
