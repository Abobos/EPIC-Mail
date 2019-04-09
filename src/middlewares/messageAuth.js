import Joi from 'joi';
import pool from '../database/config/pool';


const validateMessageDetails = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({
      status: 'failed',
      error: 'Recipient\'s email is required',
    });
  }
  const schema = {
    email: Joi.string().email()
      .regex(/^[A-Za-z0-9_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
      .error(new Error('email is not valid')),
    subject: Joi.string().required(),
    message: Joi.string().required(),
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(400).json({
      status: 'failed',
      error: (error.details) ? error.details[0].message.replace(/[""]+/g, '') : error.message,
    });
  }
  const { email } = req.body;
  pool.query('SELECT id FROM users WHERE email = $1', [email], (err, userDetails) => {
    if (!userDetails.rows[0]) {
      return res.status(400).json({
        status: 'failed',
        error: 'Receipient\'s email not found',
      });
    }
    req.body.receiverId = userDetails.rows[0].id;
    return next();
  });
};

const validateMessageId = (req, res, next) => {
  let { messageId } = req.params;
  messageId = messageId.replace(/\s/g, '');
  if (/[^0-9]/g.test(messageId)) {
    return res.status(400).json({
      status: 'failed',
      error: 'messageId is invalid',
    });
  }
  return next();
};

export { validateMessageDetails, validateMessageId };
