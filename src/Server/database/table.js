import '@babel/polyfill';
import pool from './config/pool';

const createUsersTable = `
  DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(40) NOT NULL,
    lastname VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);`;

const createMessagesTable = `
  DROP TABLE IF EXISTS messages CASCADE;
  CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    senderId int NOT NULL,
    receiverId int NOT NULL,
    parentMessageId SERIAL UNIQUE, 
    status VARCHAR(20) NOT NULL DEFAULT 'unread',
    FOREIGN KEY (senderId) REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (parentMessageId) REFERENCES "messages" (id) ON UPDATE CASCADE ON DELETE CASCADE
);`;

const migrate = async () => {
  try {
    await pool.query(createUsersTable);
    await pool.query(createMessagesTable);
    console.log('Table Created');
    pool.end();
  } catch (error) {
    console.log(error, 'Table not created');
  }
};

migrate();
// pool.query(createUserTable)
//   .then((res) => {
//     console.log(res);
//     pool.end();
//   })
//   .catch((err) => {
//     console.log(err);
//     pool.end();
//   });
