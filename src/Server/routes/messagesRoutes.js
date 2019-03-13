import express from 'express';
import messageControllers from '../controllers/messagesControllers';

const router = express.Router();

router.post('/messages', messageControllers.sendMessage);
router.get('/messages', messageControllers.receivedMessage);
router.get('/messages/unread', messageControllers.receivedUnreadMessage);
router.get('/messages/sent', messageControllers.receivedSentMessage);
router.get('/messages/:Id', messageControllers.getUserMessage);
router.delete('/messages/:Id', messageControllers.DeleteMessage);

export default router;
