import db from '../database/config/pool';

class messageController {
  static async sendEmail(req, res) {
    const senderId = req.decoded.id;
    const { subject, message } = req.body;
    const { receiverId } = req.body;
    try {
      const createdMessage = await db.query('INSERT INTO messages (subject, message) VALUES ($1, $2) RETURNING *', [subject, message]);
      const messageId = createdMessage.rows[0].id;
      await db.query('INSERT INTO inbox (senderId, receiverId, messageId) VALUES ($1, $2, $3)', [senderId, receiverId, messageId]);
      await db.query('INSERT INTO sent (senderId, receiverId, messageId) VALUES ($1, $2, $3)', [senderId, receiverId, messageId]);
      return res.status(200).json({
        status: 'success',
        data: createdMessage.rows,
      });
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

  static async getReceivedEmails(req, res) {
    const queryText = 'SELECT messages.id, inbox.createdOn, messages.subject, messages.message, inbox.senderId, inbox.receiverId, messages.parentMessageId, inbox.status FROM messages INNER JOIN inbox ON messages.id=inbox.messageId WHERE inbox.receiverId = $1 ORDER BY messages.id';
    try {
      const receivedMessages = await db.query(queryText, [req.decoded.id]);
      await db.query('UPDATE inbox SET status = $1 WHERE receiverId = $2', ['read', req.decoded.id]);
      if (receivedMessages.rows) {
        return res.status(200).json({
          status: 'success',
          data: receivedMessages.rows,
        });
      }
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

  static async getUnreadEmails(req, res) {
    const queryStatement = 'SELECT messages.id, inbox.createdOn, messages.subject, messages.message, inbox.senderId, inbox.receiverId, messages.parentMessageId, inbox.status FROM messages INNER JOIN inbox ON messages.id=inbox.messageId WHERE inbox.receiverId = $1 AND inbox.status = $2 ORDER BY messages.id';
    try {
      const unreadMessages = await db.query(queryStatement, [req.decoded.id, 'unread']);
      if (unreadMessages.rows) {
        return res.status(200).json({
          status: 'success',
          data: unreadMessages.rows,
        });
      }
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

  static async getSentEmails(req, res) {
    const queryStatement = 'SELECT messages.id, sent.createdOn, messages.subject, messages.message, sent.senderId, sent.receiverId, messages.parentMessageId, sent.status FROM messages INNER JOIN sent ON messages.id=sent.messageId WHERE sent.senderId = $1 ORDER BY messages.id';
    try {
      const sentMessages = await db.query(queryStatement, [req.decoded.id]);
      if (sentMessages.rows) {
        return res.status(200).json({
          status: 'success',
          data: sentMessages.rows,
        });
      }
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

  static async getAnEmail(req, res) {
    const messageId = Number(req.params.messageId);
    const queryText = 'SELECT messages.id, inbox.createdOn, messages.subject, messages.message, inbox.senderId, inbox.receiverId, messages.parentMessageId, inbox.status FROM messages INNER JOIN inbox ON messages.id=inbox.messageId WHERE inbox.messageId = $1 AND inbox.receiverId = $2';
    try {
      const EmailRecord = await db.query(queryText, [messageId, req.decoded.id]);
      if (EmailRecord.rows[0]) {
        return res.status(200).json({
          status: 'success',
          data: EmailRecord.rows,
        });
      }
      return res.status(404).json({
        status: 'fail',
        error: 'The email record with the given ID was not found',
      });
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

  static async deleteAnEmail(req, res) {
    const messageId = Number(req.params.messageId);
    try {
      const deletedDetails = await db.query('DELETE FROM inbox WHERE id = $1 AND receiverId = $2 RETURNING *', [messageId, req.decoded.id]);
      if (deletedDetails.rows[0]) {
        return res.status(200).json({
          status: 'success',
          data: [
            {
              message: 'Message deleted successfully',
            },
          ],
        });
      }
      return res.status(404).json({
        status: 'fail',
        error: 'The email record with the given ID was not found',
      });
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

   static async getASentEmail(req, res) {
    const messageId = Number(req.params.messageId);
    const queryText = 'SELECT messages.id, sent.createdOn, messages.subject, messages.message, sent.senderId, sent.receiverId, messages.parentMessageId, sent.status FROM messages INNER JOIN sent ON messages.id=sent.messageId WHERE sent.messageId = $1 AND sent.senderId = $2';
    try {
      const EmailRecord = await db.query(queryText, [messageId, req.decoded.id]);
      if (EmailRecord.rows[0]) {
        return res.status(200).json({
          status: 'success',
          data: EmailRecord.rows,
        });
      }
      return res.status(404).json({
        status: 'fail',
        error: 'The email record with the given ID was not found',
      });
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

    static async deleteASentEmail(req, res) {
    const messageId = Number(req.params.messageId);
    try {
      const deletedDetails = await db.query('DELETE FROM sent WHERE id = $1 AND senderId = $2 RETURNING *', [messageId, req.decoded.id]);
      if (deletedDetails.rows[0]) {
        return res.status(200).json({
          status: 'success',
          data: [
            {
              message: 'Message deleted successfully',
            },
          ],
        });
      }
      return res.status(404).json({
        status: 'fail',
        error: 'The email record with the given ID was not found',
      });
    } catch (e) {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  }

}

export default messageController;
