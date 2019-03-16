import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../database/users';


class UsersControllers {
  static userSignUp(req, res) {
    const getuser = users.find(userDetails => userDetails.email === req.body.email);
    if (getuser) {
      return res.status(409).json({
        status: 409,
        error: 'User already exists, Sign In!',
      });
    }
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const payload = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashPassword,
    };
    const userToken = jwt.sign(payload, 'secret', { expiresIn: 1440 });
    const user = {
      id: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
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
