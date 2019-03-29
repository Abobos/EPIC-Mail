import messages from '../database/messages.v1';
import pool from '../database/config/pool';

class messagesControllers {
  static sendMessage(req, res) {
    const senderId = req.decoded.userId;
    const { message, subject } = req.body;
    const { receiverId } = req.body;
    const queryText = 'INSERT INTO messages (subject, message, parentMessageId, status) VALUES ($1, $2, $3, $4) RETURNING *';
    pool.query(queryText, [subject, message, receiverId, 'sent'], (error, result) => {
      pool.query('INSERT INTO sent (senderId, message) VALUES ($1, $2) RETURNING *', [senderId, message], (err, sentMessages) => {
        const sqlStatement = 'INSERT INTO inbox (receiverId, message) VALUES ($1, $2) RETURNING *';
        pool.query(sqlStatement, [receiverId, message], (errors, userInbox) => {
          if (userInbox.rows) {
            return res.status(200).json({
              status: 'success',
              data: [
                result.rows[0],
              ],
            });
          }
        });
      });
    });
  }

  static receivedMessage(req, res) {
    const receivedMessage = messages.filter(message => message.status === 'read');
    return res.status(200).json({
      status: 'success',
      data: [
        receivedMessage,
      ],
    });
  }

  static receivedUnreadMessage(req, res) {
    const receivedUnreadMessage = messages.filter(message => message.status === 'unread');
    return res.status(200).json({
      status: 'success',
      data: [
        receivedUnreadMessage,
      ],
    });
  }

  static receivedSentMessage(req, res) {
    const receivedSentMessage = messages.filter(message => message.status === 'sent');
    return res.status(200).json({
      status: 'success',
      data: [
        receivedSentMessage,
      ],
    });
  }

  static getUserMessage(req, res) {
    const messageId = Number(req.params.Id);
    const getMessage = messages.find(m => m.id === messageId);
    if (!getMessage) {
      return res.status(404).json({
        status: 'failed',
        error: 'The message with the given id was not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      data: [
        getMessage,
      ],
    });
  }

  static DeleteMessage(req, res) {
    const messageId = Number(req.params.Id);
    const getMessage = messages.find(m => m.id === messageId);
    if (!getMessage) {
      return res.status(404).json({
        status: 'failed',
        error: 'The message with the given id was not found',
      });
    }
    const messageIndex = messages.indexOf(getMessage);
    messages.splice(messageIndex, 1);
    return res.status(200).json({
      status: 'success',
      data: [
        {
          message: getMessage.message,
        },
      ],
    });
  }
}

export default messagesControllers;
