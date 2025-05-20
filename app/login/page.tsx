'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'content-type': 'application/json' },
    });

    if (res.ok) router.push('/memecoins');
    else setError('Mot de passe incorrect');
  }

  return (
    <form onSubmit={submit} className="max-w-xs space-y-4">
      <h1 className="text-2xl font-bold">Connexion</h1>

      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Mot de passe"
        className="input w-full"
      />

      {error && <p className="text-red-600">{error}</p>}

      <button type="submit" className="btn btn-primary w-full">Se connecter</button>
    </form>
  );
}
