import Joi from 'joi';

function validateUserSignUpDetails(userDetails) {
  const schema = {
    firstName: Joi.string()
      .regex(/^[a-zA-Z]+$/)
      .error(new Error('firstName is not valid')),

    lastName: Joi.string()
      .regex(/^[a-zA-Z]+$/)
      .error(new Error('lastName is not valid')),

    email: Joi.string().email()
      .regex(/^[A-Za-z0-9_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
      .error(new Error('email is not valid')),
    password: Joi.string().trim().min(6).required(),
  };
  return Joi.validate(userDetails, schema);
}

function validateUserSignInDetails(userDetails) {
  const schema = {
    email: Joi.string().email()
      .regex(/^[A-Za-z0-9_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
      .error(new Error('email is not valid')),

    password: Joi.string().min(6).required(),
  };
  return Joi.validate(userDetails, schema);
}

const signup = (req, res, done) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  if (!firstName) {
    return res.status(400).json({
      status: 'failed',
      error: 'firstName is required',
    });
  }
  if (!lastName) {
    return res.status(400).json({
      status: 'failed',
      error: 'lastName is required',
    });
  }
  if (!email) {
    return res.status(400).json({
      status: 'failed',
      error: 'email is required',
    });
  }
  if (!password) {
    return res.status(400).json({
      status: 'failed',
      error: 'password is required',
    });
  }
  const { error } = validateUserSignUpDetails(req.body);
  if (error) {
    return res.status(400).json({
      status: 'failed',
      error: (error.details) ? error.details[0].message.replace(/[""]+/g, '') : error.message,
    });
  }
  return done();
};

const login = (req, res, done) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({
      status: 'failed',
      error: 'email is required',
    });
  }
  if (!password) {
    return res.status(400).json({
      status: 'failed',
      error: 'password is required',
    });
  }
  const { error } = validateUserSignInDetails(req.body);
  if (error) {
    return res.status(400).json({
      status: 'failed',
      error: (error.details) ? error.details[0].message.replace(/[""]+/g, '') : error.message,
    });
  }
  return done();
};

export { signup, login };
