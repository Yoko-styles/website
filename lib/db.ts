import { Pool } from 'pg';

// Pooled connection URL (6543) - Used for standard application queries
const DATABASE_URL = process.env.DATABASE_URL;
// Direct connection URL (5432) - Used for migrations and table initialization
const DIRECT_URL = process.env.DIRECT_URL;

export const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const directPool = new Pool({
  connectionString: DIRECT_URL || DATABASE_URL,
});

// Log basic status
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database (Pooled)');
});

pool.on('error', (err: unknown) => {
  console.error('Unexpected error on PostgreSQL client', err);
});

// Create tables if they don't exist
export async function initDatabase() {
  // Use direct connection for schema changes
  const client = await directPool.connect();
  try {
    // 1. Waitlist submissions
    await client.query(`
      CREATE TABLE IF NOT EXISTS waitlist_submissions (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `);

    // 2. Contact submissions
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        country_code TEXT,
        phone_number TEXT,
        inquiry_type TEXT NOT NULL,
        message TEXT NOT NULL,
        preferred_contact TEXT DEFAULT 'email',
        hear_about TEXT,
        agree_to_terms BOOLEAN NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `);
    
    console.log('Database tables verified/created successfully');
  } catch (error) {
    console.error('Failed to initialize database tables:', error);
  } finally {
    client.release();
  }
}

// Automatically initialize database when the module is loaded
// This ensures tables exist before any queries are run
if (process.env.NODE_ENV !== 'test') {
  initDatabase().catch(err => console.error('Database initialization error:', err));
}
