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

const production = postgres://bdcuzlctcqqapn:01f7edb32a851aca98bd9b9092360dffc2b9845dbf705ec2dc13a1de2a240bb4@ec2-107-20-177-161.compute-1.amazonaws.com:5432/d5qp19b9gv8htn;

let config = development;
if (process.env.NODE_ENV === 'test') config = test;
if (process.env.NODE_ENV === 'production') config = production;
const pool = new pg.Pool(config);

export default pool;
