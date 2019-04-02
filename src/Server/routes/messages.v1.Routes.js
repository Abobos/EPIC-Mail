import express from 'express';
import messageControllers from '../controllers/messages.v1.Controllers';
import validateMessageDetails from '../middlewares/validateMessageDetails';
import { verifyToken } from '../middlewares/tokenHandler';

const router = express.Router();

router.post('/messages', verifyToken, validateMessageDetails, messageControllers.sendMessage);
router.get('/messages', verifyToken, messageControllers.getReceivedMessage);
router.get('/messages/unread', verifyToken, messageControllers.getReceivedUnreadMessage);
router.get('/messages/sent', verifyToken, messageControllers.getSentMessage);
router.get('/messages/:Id', verifyToken, messageControllers.getUserMessage);
router.delete('/messages/:Id', verifyToken, messageControllers.DeleteMessage);

export default router;
