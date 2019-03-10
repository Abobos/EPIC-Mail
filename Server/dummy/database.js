const users = [
  {
    id: 1,
    email: 'blessingmakaraba@gmail.com',
    firstName: 'Blessing',
    lastName: 'Makaraba',
    password: '123456',
  },
];

const messages = [
  {
    id: 1,
    createdOn: 'Mar 08 2019 04:34:50',
    subject: 'Andela',
    message: 'Brilliance is evenly disrtributed',
    senderId: 1,
    receiverId: 1,
    parentMessageId: 1,
    status: 'draft',
  },

  {
    id: 2,
    createdOn: 'Mar 08 2019 04:34:50',
    subject: 'Andela',
    message: 'Brilliance is evenly disrtributed',
    senderId: 2,
    receiverId: 2,
    parentMessageId: 2,
    status: 'draft',
  },

  {
    id: 1,
    createdOn: 'Mar 09 2019 04:34:50',
    subject: 'Andela',
    message: 'Brilliance is evenly disrtributed',
    senderId: 1,
    receiverId: 1,
    parentMessageId: 1,
    status: 'sent',
  },

  {
    id: 2,
    createdOn: 'Mar 09 2019 04:34:50',
    subject: 'Andela',
    message: 'Brilliance is evenly disrtributed',
    senderId: 2,
    receiverId: 2,
    parentMessageId: 2,
    status: 'sent',
  },

  {
    id: 1,
    createdOn: 'Mar 10 2019 04:34:50',
    subject: 'Andela',
    message: 'Brilliance is evenly disrtributed',
    senderId: 1,
    receiverId: 1,
    parentMessageId: 1,
    status: 'unread',
  },

  {
    id: 2,
    createdOn: 'Mar 10 2019 04:34:50',
    subject: 'Andela',
    message: 'Brilliance is evenly disrtributed',
    senderId: 2,
    receiverId: 2,
    parentMessageId: 2,
    status: 'unread',
  },
];

export { users, messages };
