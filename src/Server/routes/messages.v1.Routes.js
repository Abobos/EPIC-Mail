import express from 'express';
import messageControllers from '../controllers/messages.v1.Controllers';
import { verifyToken } from '../middlewares/tokenHandler';

const router = express.Router();

router.post('/messages', verifyToken, messageControllers.sendMessage);
router.get('/messages', verifyToken, messageControllers.receivedMessage);
router.get('/messages/unread', verifyToken, messageControllers.receivedUnreadMessage);
router.get('/messages/sent', verifyToken, messageControllers.receivedSentMessage);
router.get('/messages/:Id', verifyToken, messageControllers.getUserMessage);
router.delete('/messages/:Id', verifyToken, messageControllers.DeleteMessage);

export default router;
