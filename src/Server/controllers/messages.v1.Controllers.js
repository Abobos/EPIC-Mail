import messages from '../database/messages.v1';
import db from '../database/config/pool';
import '@babel/polyfill';


class messagesControllers {
  static async sendMessage(req, res) {
    const senderId = req.decoded.userId;
    const { subject, message } = req.body;
    const { receiverId } = req.body;
    const createdMessage = await db.query('INSERT INTO messages (subject, message) VALUES ($1, $2) RETURNING *', [subject, message]);
    const messageId = createdMessage.rows[0].id;
    await db.query('INSERT INTO inbox (senderId, receiverId, messageId) VALUES ($1, $2, $3)', [senderId, receiverId, messageId]);
    await db.query('INSERT INTO sent (senderId, receiverId, messageId) VALUES ($1, $2, $3)', [senderId, receiverId, messageId]);
    return res.status(200).json({
      status: 'success',
      data: createdMessage.rows,
    });
  }

  static async getReceivedMessage(req, res) {
    const queryText = 'SELECT messages.id, inbox.createdOn, messages.subject, messages.message, messages.parentMessageId, inbox.senderId, inbox.receiverId, inbox.status FROM messages INNER JOIN inbox ON messages.id=inbox.messageId WHERE inbox.receiverId = $1 ORDER BY messages.id';
    const receivedMessages = await db.query(queryText, [req.decoded.userId]);
    await db.query('UPDATE inbox SET status = $1 WHERE receiverId = $2', ['read', req.decoded.userId]);
    if (receivedMessages.rows[0]) {
      return res.status(200).json({
        status: 'success',
        data: receivedMessages.rows,
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Inbox is empty',
    });
  }

  static async getReceivedUnreadMessage(req, res) {
    const queryStatement = 'SELECT messages.id, inbox.createdOn, messages.subject, messages.message, messages.parentMessageId, inbox.senderId, inbox.receiverId, inbox.status FROM messages INNER JOIN inbox ON messages.id=inbox.messageId WHERE inbox.receiverId = $1 AND inbox.status = $2 ORDER BY messages.id';
    const unreadMessages = await db.query(queryStatement, [req.decoded.userId, 'unread']);
    if (unreadMessages.rows[0]) {
      return res.status(200).json({
        status: 'success',
        data: unreadMessages.rows,
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'No unread messages',
    });
  }

  static async getSentMessage(req, res) {
    const queryStatement = 'SELECT messages.id, sent.createdOn, messages.subject, messages.message, messages.parentMessageId, sent.senderId, sent.receiverId, sent.status FROM messages INNER JOIN sent ON messages.id=sent.messageId WHERE sent.senderId = $1 ORDER BY messages.id';
    const sentMessages = await db.query(queryStatement, [req.decoded.userId]);
    if (sentMessages.rows[0]) {
      return res.status(200).json({
        status: 'success',
        data: sentMessages.rows,
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'No sent messages',
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
