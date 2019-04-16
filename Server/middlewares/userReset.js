import db from '../database/config/pool';
import { isEmail } from '../helpers/specialAuth';

const authUser = async (req, res, next) => {
  const { email } = req.body;
  if (isEmail(email)) {
    const userDetails = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (!userDetails.rows[0]) {
      return res.status(404).json({
        status: 'failed',
        error: 'Invalid credentials',
      });
    }
    if (userDetails.rows[0]) {
      [req.body] = userDetails.rows;
      return next();
    }
  } else {
    return res.status(400).json({
      status: 'failed',
      error: 'email is not vaild',
    });
  }
};

export default authUser;
