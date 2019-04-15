import pool from './config/pool';

const createUsersTable = `
  DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL
);`;

const createMessagesTable = `
  DROP TABLE IF EXISTS messages CASCADE;
  CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    parentMessageId SERIAL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'sent',
    FOREIGN KEY (parentMessageId) REFERENCES "messages" (id) ON UPDATE CASCADE ON DELETE CASCADE
);`;

const createInboxTable = `
  DROP TABLE IF EXISTS inbox CASCADE;
  CREATE TABLE inbox(
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
    senderId int NOT NULL,
    receiverId int NOT NULL,
    messageId int NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'unread',
    FOREIGN KEY (senderId) REFERENCES "users" (id) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES "users" (id) ON DELETE CASCADE,
    FOREIGN KEY (messageId) REFERENCES "messages" (id) ON DELETE CASCADE
);`;

const createSentTable = `
  DROP TABLE IF EXISTS sent CASCADE;
  CREATE TABLE sent(
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
    senderId int NOT NULL,
    receiverId INT NOT NULL,
    messageId INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'sent',
    FOREIGN KEY (senderId) REFERENCES "users" (id) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES "users" (id) ON DELETE CASCADE,
    FOREIGN KEY (messageId) REFERENCES "messages" (id) ON DELETE CASCADE
);`;

const createGroupTable = `
  DROP TABLE IF EXISTS groups CASCADE;
  CREATE TABLE groups(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE,
    role VARCHAR(128) NOT NULL DEFAULT 'admin',
    ownerId INT NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedOn TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (ownerId) REFERENCES "users" (id) ON DELETE CASCADE
  );`;

const createGroupMembersTable = `
  DROP TABLE IF EXISTS groupmembers CASCADE;
  CREATE TABLE groupmembers(
    id SERIAL PRIMARY KEY,
    groupId INT NOT NULL,
    userId INT NOT NULL,
    userRole VARCHAR(50) NOT NULL,
    FOREIGN KEY (groupId) REFERENCES "groups" (id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES "users" (id) ON DELETE CASCADE
  );`;

const createGroupMessagesTable = `
  DROP TABLE IF EXISTS groupmessage CASCADE;
  CREATE TABLE groupmessage(
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    parentMessageId INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'sent',
    FOREIGN KEY (parentMessageId) REFERENCES "groups" (id) ON UPDATE CASCADE ON DELETE CASCADE
  );`;

const migrate = async () => {
  try {
    await pool.query(createUsersTable);
    await pool.query(createMessagesTable);
    await pool.query(createInboxTable);
    await pool.query(createSentTable);
    await pool.query(createGroupTable);
    await pool.query(createGroupMembersTable);
    await pool.query(createGroupMessagesTable);
    console.log('Table Created');
    pool.end();
  } catch (error) {
    console.log(error, 'Table not created');
  }
};

migrate();
