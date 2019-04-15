import db from '../database/config/pool';

class groupController {
  static async createGroup(req, res) {
    const { name } = req.body;
    const ownerId = req.decoded.userId;
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
      const allGroups = await db.query('SELECT id, name, role FROM groups WHERE ownerId= $1 ORDER BY id', [req.decoded.userId]);
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
      await db.query(queryStatement, [groupId]);
      return res.status(200).json({
        status: 'success',
        message: 'Group deleted successfully',
      });
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }
}

export default groupController;
