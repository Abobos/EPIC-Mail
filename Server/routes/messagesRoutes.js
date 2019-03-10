import express from 'express';
import messageControllers from '../controllers/messagesControllers';

const router = express.Router();

router.post('/messages', messageControllers.sendMessage);

export default router;
