import Joi from 'joi';
import db from '../database/config/pool';

class groupValidator {
  static async createGroupAuth(req, res, next) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        status: 'failed',
        error: 'group name is required',
      });
    }
    const schema = {
      name: Joi.string()
        .regex(/^[a-zA-Z\s]+$/)
        .error(new Error('group name is not valid')),
    };
    const { error } = Joi.validate({ name: `${name}` }, schema);
    if (error) {
      return res.status(400).json({
        status: 'failed',
        error: error.message,
      });
    }
    try {
      const result = await db.query('SELECT * FROM groups WHERE name = $1', [name]);
      if (result.rows[0]) {
        return res.status(409).json({
          status: 'failed',
          error: 'group name already exists',
        });
      }
      return next();
    } catch (err) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

  static async validateGroupId(req, res, next) {
    const { groupId } = req.params;
    const id = groupId.replace(/\s/g, '');
    req.params.groupId = id;
    if ((!id) || (/[^0-9]/g.test(id))) {
      return res.status(400).json({
        status: 'failed',
        error: 'groupId is invalid',
      });
    }
    try {
      const result = await db.query('SELECT * FROM groups WHERE id = $1', [req.params.groupId]);
      if (result.rows[0]) return next();
      return res.status(404).json({
        status: 'failed',
        error: 'The group with the given ID was not found',
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

  static async checkOwner(req, res, next) {
    try {
      const result = await db.query('SELECT * FROM groups WHERE id =$1 AND ownerId = $2', [req.params.groupId, req.decoded.userId]);
      if (result.rows[0]) return next();
      return res.status(409).json({
        status: 'failed',
        error: 'You are not the owner of this group',
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

  static async scruntinize(req, res, next) {
    const { users } = req.body;
    const groupmembers = [];
    let memberId;
    try {
      for (const memberEmail of users) {
        if ((req.decoded.userEmail) === memberEmail) {
          return res.status(409).json({
            status: 'failed',
            error: 'You can\'t add yourself as a member of a group you own',
          });
        }
        const getUserId = await db.query('SELECT * FROM users WHERE email = $1', [memberEmail]);
        if (getUserId.rows[0]) {
          memberId = getUserId.rows[0].id;
          groupmembers.push(memberId);
        }
        if (!getUserId.rows[0]) {
          return res.status(404).json({
            status: 'failed',
            error: `${memberEmail} is not a registered user`,
          });
        }
        const userIdDuplicate = await db.query('SELECT * FROM groupmembers WHERE groupId = $1 AND userId = $2', [req.params.groupId, memberId]);
        if (userIdDuplicate.rows[0]) {
          return res.status(409).json({
            status: 'failed',
            error: `${memberEmail} already belongs to this group`,
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
    // remove duplicate id
    const memberIds = Array.from(new Set(groupmembers));
    req.body = memberIds;
    return next();
  }
}

export default groupValidator;
