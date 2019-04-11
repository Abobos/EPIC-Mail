import express from 'express';
import groupController from '../controllers/groupController';
import { verifyToken } from '../middlewares/tokenHandler';
import Auth from '../middlewares/groupAuth';

const router = express.Router();

router.post('/groups', verifyToken, Auth.createGroupAuth, groupController.createGroup);
router.get('/groups', verifyToken, groupController.getGroups);
router.patch('/groups/:groupId/name', verifyToken, Auth.validateGroupId, Auth.checkOwner, Auth.createGroupAuth, groupController.editGroupName);

export default router;
