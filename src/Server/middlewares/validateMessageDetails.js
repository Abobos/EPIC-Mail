import Joi from 'joi';

function validateMessageDetails(MessageDetails) {
  const schema = {
    subject: Joi.string().required(),
    message: Joi.string().required(),
    user: Joi.string().required(),
  };
  return Joi.validate(MessageDetails, schema);
}

export default validateMessageDetails;
