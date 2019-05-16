import { Pool } from 'pg';
import dotenv from 'dotenv';
import * as envConfig from './environments';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = process.env[envConfig[env].envVariable];
const pool = new Pool({ connectionString: config });

// pool.connect()
// .then(console.log(`connect to ${process.env.NODE_ENV}`))
// .catch(e => console.log('something went wrong'));

export default pool;

