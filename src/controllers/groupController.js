import db from '../database/config/pool';

class groupController {
  static async createGroup(req, res) {
    const { name } = req.body;
    try {
      const createdGroup = await db.query('INSERT INTO groups (name) VALUES ($1) RETURNING *', [name]);
      return res.status(201).json({
        status: 'success',
        data: createdGroup.rows,
      });
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }
}

export default groupController;
