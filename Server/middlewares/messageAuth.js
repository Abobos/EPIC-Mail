import Joi from 'joi';
import db from '../database/config/pool';

const validateMessageDetails = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({
      status: 'fail',
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
      status: 'fail',
      error: (error.details) ? error.details[0].message.replace(/[""]+/g, '') : error.message,
    });
  }
  if ((req.body.email) === (req.decoded.email)) {
    return res.status(409).json({
      status: 'fail',
      error: 'you cannot send a message to yourself',
    });
  }
  const { email } = req.body;
  try {
    const userDetails = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (!userDetails.rows[0]) {
      return res.status(400).json({
        status: 'fail',
        error: 'Receipient\'s email not found',
      });
    }
    req.body.receiverId = userDetails.rows[0].id;
    req.body.receiverEmail = email;
    return next();
  } catch (e) {
    return res.status(500).json({
      error: 'Something went wrong',
    });
  }
};

const validateMessageId = (req, res, next) => {
  const { messageId } = req.params;
  const id = messageId.replace(/\s/g, '');
  req.params.messageId = id;
  if ((!id) || (/[^0-9]/g.test(id))) {
    return res.status(400).json({
      status: 'fail',
      error: 'messageId is invalid',
    });
  }
  return next();
};

export { validateMessageDetails, validateMessageId };
