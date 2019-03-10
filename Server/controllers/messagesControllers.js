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
}


export default messagesControllers;
