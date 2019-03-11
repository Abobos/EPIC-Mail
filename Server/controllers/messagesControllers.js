import { messages } from '../dummy/database';
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
}

export default messagesControllers;
