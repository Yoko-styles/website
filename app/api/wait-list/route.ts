import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: NextRequest) {
  const client = await pool.connect();

  try {
    const body = await request.json();
    const { name, email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Ensure table exists
    const createTable = `
      CREATE TABLE IF NOT EXISTS waitlist_submissions (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `;

    await client.query(createTable);

    const insertQuery = `
      INSERT INTO waitlist_submissions (name, email)
      VALUES ($1, $2)
      ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
      RETURNING *;
    `;

    const values = [name?.trim() || null, email.trim().toLowerCase()];
    const result = await client.query(insertQuery, values);

    return NextResponse.json({ success: true, data: result.rows[0] }, { status: 201 });
  } catch (err) {
    console.error('Waitlist error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  } finally {
    client.release();
  }
}
