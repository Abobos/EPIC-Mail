import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../database/users';
import { validateUserSignUpDetails, validateUserSignInDetails } from '../middlewares/validateUserDetails';


class UsersControllers {
// eslint-disable-next-line class-methods-use-this
  static userSignUp(req, res) {
    const { error } = validateUserSignUpDetails(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/[""]+/g, ''),
      });
    }
    const getuser = users.find(k => k.email === req.body.email);
    if (getuser) {
      return res.status(409).json({
        status: 409,
        error: 'User already exists, Sign In!',
      });
    }
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const payload = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashPassword,
    };
    const userToken = jwt.sign(payload, 'secret', { expiresIn: 1440 });
    const user = {
      id: users.length + 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashPassword,
      authData: userToken,
    };
    users.push(user);
    return res.status(201).json({
      status: 201,
      data: [
        {
          token: userToken,
        },
      ],
    });
  }

  static userSignIn(req, res) {
    const { error } = validateUserSignInDetails(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/[""]+/g, ''),
      });
    }
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
