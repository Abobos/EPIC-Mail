/* eslint-disable no-console */
import messages from '../database/messages';
import validateMessageDetails from '../middlewares/validateMessageDetails';

class messagesControllers {
  static sendMessage(req, res) {
    const { error } = validateMessageDetails(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/[""]+/g, ''),
      });
    }
    return res.status(200).json({
      status: 200,
      data: [
        {
          id: messages.length + 1,
          createdOn: (new Date().toLocaleString()),
          subject: req.body.subject,
          message: req.body.message,
          parentMessageId: messages.length + 1,
          status: 'sent',
        },
      ],
    });
  }

  static receivedMessage(req, res) {
    const receivedMessage = messages.filter(message => message.status === 'read');
    return res.status(200).json({
      status: 200,
      data: [
        receivedMessage,
      ],
    });
  }

  static receivedUnreadMessage(req, res) {
    const receivedUnreadMessage = messages.filter(message => message.status === 'unread');
    return res.status(200).json({
      status: 200,
      data: [
        receivedUnreadMessage,
      ],
    });
  }

  static receivedSentMessage(req, res) {
    const receivedSentMessage = messages.filter(message => message.status === 'sent');
    return res.status(200).json({
      status: 200,
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
        status: 404,
        error: 'The message with the given id was not found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: [
        getMessage,
      ],
    });
  }
}

export default messagesControllers;
