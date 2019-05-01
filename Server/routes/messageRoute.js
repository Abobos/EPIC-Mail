import express from 'express';
import messageController from '../controllers/messageController';
import { verifyToken } from '../middlewares/tokenHandler';
import { validateMessageDetails, validateMessageId } from '../middlewares/messageAuth';
import { trim, transformEmail } from '../helpers/specialAuth';

const router = express.Router();

router.post('/messages', verifyToken, trim, transformEmail, validateMessageDetails, messageController.sendEmail);
router.get('/messages', verifyToken, messageController.getReceivedEmails);
router.get('/messages/unread', verifyToken, messageController.getUnreadEmails);
router.get('/messages/sent', verifyToken, messageController.getSentEmails);
router.get('/messages/:messageId', verifyToken, validateMessageId, messageController.getAnEmail);
router.delete('/messages/:messageId', verifyToken, validateMessageId, messageController.deleteAnEmail);
router.get('/messages/sent/:messageId', verifyToken, validateMessageId, messageController.getASentEmail);
router.delete('/messages/sent/:messageId', verifyToken, validateMessageId, messageController.deleteASentEmail);

export default router;
