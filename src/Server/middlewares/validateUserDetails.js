import Joi from 'joi';

function validateUserSignUpDetails(userDetails) {
  const schema = {
    firstname: Joi.string().trim().required(),
    lastname: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).required(),
    confirm_password: Joi.any().equal(Joi.ref('password')).required(),
  };
  return Joi.validate(userDetails, schema);
}

function validateUserSignInDetails(userDetails) {
  const schema = {
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(userDetails, schema);
}

export { validateUserSignUpDetails, validateUserSignInDetails };
