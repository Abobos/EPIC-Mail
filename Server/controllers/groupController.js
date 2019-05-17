import db from '../database/config/pool';

class groupController {
  static async createGroup(req, res) {
    const { name } = req.body;
    const ownerId = req.decoded.id;
    try {
      const createdGroupDetails = await db.query('INSERT INTO groups (name, ownerId) VALUES ($1, $2) RETURNING *', [name, ownerId]);
      const createdGroup = createdGroupDetails.rows.map((groupDetails) => {
        const group = {
          id: groupDetails.id,
          name: groupDetails.name,
          role: groupDetails.role,
        };
        return group;
      });
      const { id } = createdGroupDetails.rows[0];
      await db.query('INSERT INTO groupmembers (groupId, userId, userRole) VALUES ($1, $2, $3) RETURNING *', [id, ownerId, 'Admin']);
      return res.status(201).json({
        status: 'success',
        data: createdGroup,
      });
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

  static async getGroups(req, res) {
    try {
      const allGroups = await db.query('SELECT groups.id, groups.name, groupmembers.userRole FROM groups, groupmembers WHERE groups.id = groupmembers.groupId AND groupmembers.userId = $1 ORDER BY groups.id', [req.decoded.id]);
      return res.status(200).json({
        status: 'success',
        data: allGroups.rows,
      });
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

  static async editGroupName(req, res) {
    const groupId = Number(req.params.groupId);
    const queryStatement = 'UPDATE groups SET name = $1 WHERE id = $2 RETURNING *';
    try {
      const editedGroup = await db.query(queryStatement, [req.body.name, groupId]);
      const editedGroupDetails = editedGroup.rows.map((groupDetails) => {
        const group = {
          id: groupDetails.id,
          name: groupDetails.name,
          role: groupDetails.role,
        };
        return group;
      });
      return res.status(200).json({
        status: 'success',
        data: editedGroupDetails,
      });
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

  static async deleteGroup(req, res) {
    const groupId = Number(req.params.groupId);
    const queryStatement = 'DELETE FROM groups WHERE id = $1 RETURNING *';
    try {
      const deletedGroup = await db.query(queryStatement, [groupId]);
      if (deletedGroup.rows[0]) {
        return res.status(200).json({
          status: 'success',
          data: [

            {
              message: 'Group deleted successfully',
            },
          ],
        });
      }
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

  static async addUsers(req, res) {
    const memberIds = req.body;
    const groupId = Number(req.params.groupId);
    const queryStatement = 'INSERT INTO groupmembers (groupId, userId, userRole) VALUES ($1, $2, $3) RETURNING *';
    try {
      const groups = [];
      for (const memberId of memberIds) {
        const { rows } = await db.query(queryStatement, [groupId, memberId, 'member']);
        groups.push(rows[0]);
      }
      const groupInfo = groups.map((group) => {
        const info = {
          id: group.groupid,
          userId: group.userid,
          userRole: group.userrole,
        };
        return info;
      });
      return res.status(200).json({
        status: 'success',
        data: groupInfo,
      });
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

  static async deleteUser(req, res) {
    const groupId = Number(req.params.groupId);
    const userId = Number(req.params.userId);
    try {
      const deletedMember = await db.query('DELETE FROM groupmembers WHERE groupId = $1 AND userId = $2 RETURNING *', [groupId, userId]);
      if (deletedMember.rows[0]) {
        return res.status(200).json({
          status: 'success',
          data: [
            {
              message: 'User deleted from group',
            },
          ],
        });
      }
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

  static async sendMessage(req, res) {
    const groupId = Number(req.params.groupId);
    const { subject, message } = req.body;
    try {
      const createdMessage = await db.query('INSERT INTO groupmessage (subject, message, parentMessageId) VALUES ($1, $2, $3) RETURNING *', [subject, message, groupId]);
      return res.status(200).json({
        status: 'success',
        data: createdMessage.rows,
      });
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }
}

export default groupController;
