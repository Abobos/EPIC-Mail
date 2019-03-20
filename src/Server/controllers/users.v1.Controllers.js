import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../database/users.v1';
import pool from '../database/config/pool';

dotenv.config();

class UsersControllers {
  static userSignUp(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;
    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
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
      const userToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 1440 });
      pool.query('INSERT INTO users (firstname, lastname, email , password) VALUES ($1, $2, $3, $4)',
        [firstName, lastName, email, hashPassword], (error, user) => {
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
    const user = users.find(userDetails => userDetails.email === req.body.email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'Details not found, Sign Up!',
      });
    }
    const { authData, password } = user;
    const hashValue = bcrypt.compareSync(req.body.password, password);
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
          token: authData,
        },
      ],
    });
  }
}


export default UsersControllers;
