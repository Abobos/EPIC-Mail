import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();z

let config = process.env.DATABASE_URL_DEV;

if (process.env.NODE_ENV === 'test') config = process.env.DATABASE_URL_TEST;

const pool = new Pool({ connectionString: config });

export default pool;
