import express from 'express';
import groupController from '../controllers/groupController';
import { verifyToken } from '../middlewares/tokenHandler';
import Auth from '../middlewares/groupAuth';
import { trim } from '../helpers/specialAuth';

const router = express.Router();

router.post('/groups', verifyToken, trim, Auth.createGroupAuth, groupController.createGroup);
router.get('/groups', verifyToken, groupController.getGroups);
router.patch('/groups/:groupId/name', verifyToken, Auth.validateGroupId, Auth.checkOwner, trim, Auth.createGroupAuth, groupController.editGroupName);
router.delete('/groups/:groupId', verifyToken, Auth.validateGroupId, Auth.checkOwner, groupController.deleteGroup);

export default router;
