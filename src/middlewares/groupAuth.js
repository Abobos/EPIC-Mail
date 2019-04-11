import Joi from 'joi';
import db from '../database/config/pool';

const groupAuth = (req, res, next) => {
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
  db.query('SELECT * FROM groups WHERE name = $1', [name])
    .then((result) => {
      if (result.rows[0]) {
        return res.status(409).json({
          status: 'failed',
          error: 'group name already exists',
        });
      }
      return next();
    })
    .catch((err) => {
        return res.status(500).json({
        error: 'Something went wrong',
      });
  });
}

export default groupAuth;
