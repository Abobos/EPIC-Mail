import pool from './config/pool';

const createUserTable = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
         id SERIAL NOT NULL PRIMARY KEY,
         firstname VARCHAR(40) NOT NULL,
         lastname VARCHAR(40) NOT NULL,
         email VARCHAR(50) NOT NULL,
         password VARCHAR(255) NOT NULL
      );`;

pool.query(createUserTable)
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });
