import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../database/config/pool';

dotenv.config();

class UsersControllers {
  static userSignUp(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;
    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result, next) => {
      if (err) throw err;
      if (result.rows.length > 0) {
        return res.status(409).json({
          status: 409,
          error: 'User already exists, Sign In!',
        });
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      };
      const userToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
      pool.query('INSERT INTO users (firstname, lastname, email , password) VALUES ($1, $2, $3, $4)',
        [firstName, lastName, email, hashPassword], (error, user, done) => {
          if (error) throw error;
          if (user.rows) {
            return res.status(201).json({
              status: 201,
              data: [
                {
                  token: userToken,
                },
              ],
            });
          }
        });
    });
  }

  static userSignIn(req, res) {
    const { email } = req.body;
    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
      if (err) throw err;
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Details not found, Sign Up!',
        });
      }
      const hashpassword = result.rows[0].password;
      const hashValue = bcrypt.compareSync(req.body.password, hashpassword);
      if (!hashValue) {
        return res.status(401).json({
          status: 401,
          error: 'Incorrect password!',
        });
      }
      const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      };
      const userToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
      return res.status(200).json({
        status: 200,
        data: [
          {
            token: userToken,
          },
        ],
      });
    });
  }
}

export default UsersControllers;
