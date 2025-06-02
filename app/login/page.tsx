'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [password, setPassword]     = useState('');
  const [error, setError]           = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const res = await fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error || 'Login failed');
      setSubmitting(false);
      return;
    }

    window.location.href = '/memecoins';
  };

  return (
    <div className="container mx-auto p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Connexion</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block font-medium">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {isSubmitting ? '…' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}