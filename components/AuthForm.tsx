'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || !password || (mode === 'register' && !username)) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          mode === 'register'
            ? { email, username, password }
            : { email, password }
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur inconnue');
      }

      if (mode === 'register') {
        setMessage('Compte créé avec succès ! Vous pouvez vous connecter.');
        setMode('login');
        setEmail('');
        setPassword('');
        setUsername('');
      } else {
        router.refresh();
        router.push('/memecoins');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <h2 className="text-xl font-semibold">
        {mode === 'login' ? 'Connexion' : 'Créer un compte'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div>
            <label htmlFor="username" className="block text-sm font-medium">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              disabled={loading}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? 'Chargement...' : mode === 'login' ? 'Se connecter' : 'Créer un compte'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        {mode === 'login' ? (
          <>
            Pas encore de compte ?{' '}
            <button
              onClick={() => setMode('register')}
              className="text-indigo-600 hover:underline"
            >
              S'inscrire
            </button>
          </>
        ) : (
          <>
            Déjà inscrit ?{' '}
            <button
              onClick={() => setMode('login')}
              className="text-indigo-600 hover:underline"
            >
              Se connecter
            </button>
          </>
        )}
      </p>
    </div>
  );
}