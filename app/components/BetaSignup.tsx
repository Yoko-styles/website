"use client";

import { useState, useRef, useEffect } from "react";

export default function BetaSignup() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/wait-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name || null, email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Failed to sign up for waitlist');
      } else {
        setSent(true);
      }
    } catch (err) {
      console.error('Waitlist submit error', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // focus the input when the hash is #beta-email, and on future hash changes
    if (typeof window === "undefined") return;
    const focusIfHash = () => {
      if (window.location.hash === "#beta-email") {
        inputRef.current?.focus();
      }
    };
    focusIfHash();
    window.addEventListener("hashchange", focusIfHash);
    return () => window.removeEventListener("hashchange", focusIfHash);
  }, []);

  return (
    <div className="max-w-md">
      {sent ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <strong>Thanks —</strong> we'll email you when beta access opens.
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-2">
          <input
            type="text"
            aria-label="Your name (optional)"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />

          <div className="flex gap-2">
            <input
              id="beta-email"
              ref={inputRef}
              type="email"
              aria-label="Email address"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-md"
            />
            <button
              className={`bg-black text-white px-4 py-2 rounded-md ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </form>
      )}
      <p className="mt-2 text-sm text-gray-500">🔒 We respect your privacy. No spam, ever.</p>
    </div>
  );
}
