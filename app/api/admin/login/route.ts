import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

const HARDCODED_PASSWORD = process.env.ADMIN_PASSWORD || 'letmein123'; // read from env, fallback to hardcoded

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body || {};

      if (!password || password !== HARDCODED_PASSWORD) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }

      // Ensure tables exist and return the latest rows
      const client = await pool.connect();
      try {
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

        await client.query(`
          CREATE TABLE IF NOT EXISTS waitlist_submissions (
            id SERIAL PRIMARY KEY,
            name TEXT,
            email TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
          );
        `);

        const contacts = await client.query(`SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 100`);
        const waitlist = await client.query(`SELECT * FROM waitlist_submissions ORDER BY created_at DESC LIMIT 100`);

        return NextResponse.json({ success: true, contacts: contacts.rows, waitlist: waitlist.rows });
      } finally {
        client.release();
      }
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
