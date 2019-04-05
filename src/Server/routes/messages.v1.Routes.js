import express from 'express';
import messageControllers from '../controllers/messages.v1.Controllers';
import { validateMessageDetails, validateMessageId } from '../middlewares/validateMessageDetails';
import { verifyToken } from '../middlewares/tokenHandler';

const router = express.Router();

router.post('/messages', verifyToken, validateMessageDetails, messageControllers.sendEmail);
router.get('/messages', verifyToken, messageControllers.getReceivedEmails);
router.get('/messages/unread', verifyToken, messageControllers.getUnreadEmails);
router.get('/messages/sent', verifyToken, messageControllers.getSentEmails);
router.get('/messages/:messageId', verifyToken, validateMessageId, messageControllers.getAnEmail);
// router.delete('/messages/:messageId', verifyToken, validateMessageId, messageControllers.deleteAnEmail);

export default router;
