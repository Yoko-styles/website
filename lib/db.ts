import { Pool } from 'pg';

// Prefer DATABASE_URL if provided, otherwise use individual environment variables
const connectionString = process.env.DATABASE_URL;

export const pool = connectionString
  ? new Pool({ connectionString })
  : new Pool({
      user: process.env.POSTGRES_USER || 'admin',
      password: process.env.POSTGRES_PASSWORD || 'secret',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      database: process.env.POSTGRES_DB || 'mydb',
    });

// Log basic status
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err: unknown) => {
  console.error('Unexpected error on PostgreSQL client', err);
});
