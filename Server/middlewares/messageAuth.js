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
  if ((req.body.email) === (req.decoded.userEmail)) {
    return res.status(409).json({
      status: 'failed',
      error: 'you cannot send a message to yourself',
    })
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
  const { messageId } = req.params;
  const id = messageId.replace(/\s/g, '');
  req.params.messageId = id;
  if ((!id) || (/[^0-9]/g.test(id))) {
    return res.status(400).json({
      status: 'failed',
      error: 'messageId is invalid',
    });
  }
  return next();
};

export { validateMessageDetails, validateMessageId };
