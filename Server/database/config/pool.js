import { Pool } from 'pg';
import * as envConfig from './environments';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = process.env[envConfig[env].envVariable];
const pool = new Pool({ connectionString: config });

export default pool;
