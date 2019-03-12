import express from 'express';
import messageControllers from '../controllers/messagesControllers';

const router = express.Router();

router.post('/messages', messageControllers.sendMessage);
router.get('/messages', messageControllers.receivedMessage);
router.get('/unread/messages', messageControllers.receivedUnreadMessage);

export default router;
