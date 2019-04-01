import messages from '../database/messages.v1';
import pool from '../database/config/pool';


class messagesControllers {
  static sendMessage(req, res) {
    const senderId = req.decoded.userId;
    const { message, subject } = req.body;
    const { receiverId } = req.body;
    const queryText = 'INSERT INTO messages (subject, message, senderId, receiverId) VALUES ($1, $2, $3, $4) RETURNING *';
    pool.query(queryText, [subject, message, senderId, receiverId], (err, result) => {
      if (result.rows) {
        const sentMessage = result.rows.map((messageBody) => {
          const messageDetails = {
            id: messageBody.id,
            createdOn: messageBody.createdon,
            subject: messageBody.subject,
            message: messageBody.message,
            parentMessageId: messageBody.parentmessageid,
            status: 'sent',
          };
          return messageDetails;
        });

        return res.status(200).json({
          status: 'success',
          data: sentMessage,
        });
      }
    });
  }

  static receivedMessage(req, res) {
    pool.query('SELECT * FROM messages WHERE receiverId = $1', [req.decoded.userId], (err, result) => {
      if (result.rows[0]) {
        pool.query('UPDATE messages SET status = $1 WHERE receiverId = $2', ['read', req.decoded.userId]);
        return res.status(200).json({
          status: 'success',
          data: result.rows,
        });
      }
      return res.status(200).json({
        status: 'success',
        data: 'inbox is empty',
      });
    });
  }

  static receivedUnreadMessage(req, res) {
    pool.query('SELECT * FROM messages WHERE receiverId = $1 AND status = $2', [req.decoded.userId, 'unread'], (err, result) => {
      if (result.rows[0]) {
        return res.status(200).json({
          status: 'success',
          data: result.rows,
        });
      }
      return res.status(200).json({
        status: 'success',
        data: 'No unread messages',
      });
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
