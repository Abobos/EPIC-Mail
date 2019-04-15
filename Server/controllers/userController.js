import bcrypt from 'bcrypt';
import db from '../database/config/pool';
import { generateToken } from '../middlewares/tokenHandler';


class UserController {
  static async userSignUp(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;
    try {
      const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (existingUser.rows[0]) {
        return res.status(409).json({
          status: 'failed',
          error: 'User details already exists',
        });
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      const newUser = await db.query('INSERT INTO users (firstname, lastname, email , password) VALUES ($1, $2, $3, $4) RETURNING *',
        [firstName, lastName, email, hashPassword]);
      if (newUser.rows[0]) {
        return res.status(201).json({
          status: 'success',
          data: [
            {
              token: generateToken(newUser.rows[0]),
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

  static async userSignIn(req, res) {
    const { email } = req.body;
    try {
      const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (!existingUser.rows[0]) {
        return res.status(404).json({
          status: 'failed',
          error: 'User details not found',
        });
      }
      const hashpassword = existingUser.rows[0].password;
      const hashValue = bcrypt.compareSync(req.body.password, hashpassword);
      if (!hashValue) {
        return res.status(401).json({
          status: 'failed',
          error: 'Incorrect password!',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: [
          {
            token: generateToken(existingUser.rows[0]),
          },
        ],
      });
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }
}

export default UserController;
