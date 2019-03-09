
import jwt from 'jsonwebtoken';
import { users } from '../dummy/database';
import validateUserDetails from '../middlewares/validateUserDetails';


class UsersControllers {
  // eslint-disable-next-line class-methods-use-this
  static userSignUp(req, res) {
    const { error } = validateUserDetails(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const user = {
      id: users.length + 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    };
    users.push(user);
    const payload = {
      email: req.body.email,
    };
    const token = jwt.sign(payload, 'secret', { expiresIn: 1440 });
    return res.status(201).json({
      status: 201,
      data: [
        {
          token,
        },
      ],
    });
  }
}


export default UsersControllers;
