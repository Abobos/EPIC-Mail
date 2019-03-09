import Joi from 'joi';

function validateUserDetails(userDetails) {
  const schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().alphanum().min(6).required(),
    confirm_password: Joi.any().equal(Joi.ref('password')).required(),
  };
  return Joi.validate(userDetails, schema);
}

export default validateUserDetails;
