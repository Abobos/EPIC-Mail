import bcrypt from 'bcrypt';
import db from '../database/config/pool';
import { generateToken } from '../middlewares/tokenHandler';
import sendEmail from '../utils/sendEmail';

class UserController {
  static async userSignUp(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;
    try {
      const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (existingUser.rows[0]) {
        return res.status(409).json({
          status: 'fail',
          error: 'This email already exists',
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
          status: 'fail',
          error: 'Invalid credentials',
        });
      }
      const hashpassword = existingUser.rows[0].password;
      const hashValue = bcrypt.compareSync(req.body.password, hashpassword);
      if (!hashValue) {
        return res.status(401).json({
          status: 'fail',
          error: 'Invalid credentials',
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

  static async sendResetLink(req, res) {
    const { firstname, email } = req.body;
    const token = await generateToken(req.body);
    const response = await sendEmail(email, firstname, token);
    if (response === 'fail') {
      return res.status(500).json({
        status: 'fail',
        error: 'Network Issue: something went wrong',
      });
    }
    return res.status(200).json({
      status: 'success',
      data: [
        {
          message: 'Check your email for password reset link',
          email,
        },
      ],
    });
  }

  static async resetPassword(req, res) {
    const { password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    try {
      await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashPassword, req.decoded.id]);
      return res.status(200).json({
        status: 'success',
        data: [
          {
            message: 'Your password reset was successful',
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
