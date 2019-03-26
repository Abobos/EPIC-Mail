import bcrypt from 'bcrypt';
import pool from '../database/config/pool';
import { generateToken } from '../middlewares/tokenHandler';


class UsersControllers {
  static userSignUp(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;
    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, existingUser) => {
      if (err) console.log(err);
      if (existingUser.rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'User already exists, Sign In!',
        });
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      pool.query('INSERT INTO users (firstname, lastname, email , password) VALUES ($1, $2, $3, $4) RETURNING *',
        [firstName, lastName, email, hashPassword], (error, newUser) => {
          if (error) console.log(error);
          if (newUser.rows[0]) {
            return res.status(201).json({
              status: 201,
              data: [
                {
                  token: generateToken(newUser.rows[0]),
                },
              ],
            });
          }
        });
    });
  }

  static userSignIn(req, res) {
    const { email } = req.body;
    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, existingUser) => {
      if (err) console.log(err);
      if (!existingUser.rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Details not found, Sign Up!',
        });
      }
      const hashpassword = existingUser.rows[0].password;
      const hashValue = bcrypt.compareSync(req.body.password, hashpassword);
      if (!hashValue) {
        return res.status(401).json({
          status: 401,
          error: 'Incorrect password!',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [
          {
            token: generateToken(existingUser.rows[0]),
          },
        ],
      });
    });
  }
}

export default UsersControllers;
