import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: NextRequest) {
  const client = await pool.connect();
  
  try {
    const body = await request.json();

    // Validate required fields
    const { 
      name, 
      email, 
      inquiryType, 
      message, 
      hearAbout,
      agreeToTerms,
      countryCode,
      phoneNumber,
      preferredContact
    } = body;

    if (!name || !email || !inquiryType || !message || !hearAbout || !agreeToTerms) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate terms agreement
    if (!agreeToTerms) {
      return NextResponse.json(
        { error: 'You must agree to the terms and conditions' },
        { status: 400 }
      );
    }

    // Insert data into PostgreSQL
    // Ensure table exists (safe to run each time)
    const createTable = `
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
    `;

    await client.query(createTable);

    const query = `
      INSERT INTO contact_submissions (
        name, email, country_code, phone_number, inquiry_type, 
        message, preferred_contact, hear_about, agree_to_terms
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const values = [
      name.trim(),
      email.trim().toLowerCase(),
      countryCode || '+1',
      phoneNumber?.trim() || null,
      inquiryType,
      message.trim(),
      preferredContact || 'email',
      hearAbout,
      agreeToTerms,
    ];

    const result = await client.query(query, values);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully!',
        data: result.rows[0]
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
