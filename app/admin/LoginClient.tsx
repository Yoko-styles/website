"use client";

import { useState } from 'react';

export default function LoginClient() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contacts, setContacts] = useState<any[] | null>(null);
  const [waitlist, setWaitlist] = useState<any[] | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Login failed');
      } else {
        setContacts(data.contacts || []);
        setWaitlist(data.waitlist || []);
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {!contacts ? (
        <form onSubmit={submit} className="max-w-md">
          <label className="block mb-2">Admin password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <button type="submit" className="bg-black text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-3 mt-4">Contact Submissions</h2>
          <div className="overflow-x-auto bg-white rounded shadow mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Inquiry Type</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone Number</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Message</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts?.map((c: any) => (
                  <tr key={c.id}>
                    <td className="px-4 py-3 text-sm text-gray-700">{c.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{c.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{c.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{c.inquiry_type}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{c.phone_number}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{c.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-semibold mb-3">Waitlist Submissions</h2>
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {waitlist?.map((w: any) => (
                  <tr key={w.id}>
                    <td className="px-4 py-3 text-sm text-gray-700">{w.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{w.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{w.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
