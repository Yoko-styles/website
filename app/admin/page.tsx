import React from 'react';
import LoginClient from './LoginClient';

export default function AdminPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <LoginClient />
    </div>
  );
}
