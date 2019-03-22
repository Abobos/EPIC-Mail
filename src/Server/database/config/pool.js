import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const development = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const test = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE_TEST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};


let config = development;
if (process.env.NODE_ENV === 'test') config = test;
if (process.env.NODE_ENV === 'production') config = production;
const pool = new pg.Pool(config);

export default pool;
