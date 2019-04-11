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
        .regex(/^[a-zA-Z]+$/)
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
}

export default groupValidator;
