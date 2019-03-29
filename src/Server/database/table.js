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
    subject VARCHAR(40) NOT NULL,
    message VARCHAR(600) NOT NULL,
    parentMessageId int NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (parentMessageId) REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE
);`;

const createSentTable = `
  DROP TABLE IF EXISTS sent CASCADE;
  CREATE TABLE sent(
    senderId int NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
    message VARCHAR(600) NOT NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'sent'

);`;

const createInboxTable = `
  DROP TABLE IF EXISTS inbox CASCADE;
  CREATE TABLE inbox(
    receiverId int NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
    message VARCHAR(600) NOT NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'unread'
);`;

const migrate = async () => {
  try {
    await pool.query(createUsersTable);
    await pool.query(createMessagesTable);
    await pool.query(createSentTable);
    await pool.query(createInboxTable);
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
