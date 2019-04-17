import express from 'express';
import groupController from '../controllers/groupController';
import { verifyToken } from '../middlewares/tokenHandler';
import Auth from '../middlewares/groupAuth';
import { trim, splitUsers } from '../helpers/specialAuth';

const router = express.Router();

router.post('/groups', verifyToken, trim, Auth.createGroupAuth, groupController.createGroup);
router.get('/groups', verifyToken, groupController.getGroups);
router.patch('/groups/:groupId/name',
  verifyToken,
  Auth.validateGroupId,
  Auth.checkOwner,
  trim,
  Auth.createGroupAuth,
  groupController.editGroupName);
router.delete('/groups/:groupId',
  verifyToken,
  Auth.validateGroupId,
  Auth.checkOwner,
  groupController.deleteGroup);
router.post('/groups/:groupId/users',
  verifyToken,
  Auth.validateGroupId,
  Auth.checkOwner,
  splitUsers,
  Auth.scruntinize,
  groupController.addUsers);
router.delete('/groups/:groupId/users/:userId',
  verifyToken,
  Auth.validateGroupId,
  Auth.checkOwner,
  Auth.validateUserId,
  Auth.isMember,
  groupController.deleteUser);
router.post('/groups/:groupId/messages',
  verifyToken,
  Auth.validateGroupId,
  Auth.isMember,
  trim,
  Auth.checkMessageDetails,
  groupController.sendMessage);

export default router;
