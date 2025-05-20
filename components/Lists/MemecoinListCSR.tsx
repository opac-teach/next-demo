'use client';

import { useState, useEffect } from 'react';
import MemecoinItem from '../../app/memecoins/MemecoinItem';

interface Memecoin {
  id: string;
  name: string;
  symbol: string;
  description?: string;
  logoUrl?: string;
}

export default function MemecoinListCSR() {
  const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMemecoins = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins');

      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des memecoins: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Réponse API incorrecte: les données ne sont pas un tableau');
      }

      const filteredData = data.filter(item =>
        item &&
        typeof item === 'object' &&
        'id' in item &&
        'name' in item &&
        'symbol' in item
      );

      setMemecoins(filteredData);
    } catch (error) {
      console.error('Erreur:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemecoins();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {loading
            ? 'Chargement des memecoins...'
            : `${memecoins.length} memecoins trouvés (CSR)`
          }
        </h2>
        <button
          onClick={fetchMemecoins}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Chargement...' : 'Rafraîchir'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : memecoins.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          Aucun memecoin trouvé
        </p>
      ) : (
        <ul className="space-y-4">
          {memecoins.map((memecoin) => (
            <MemecoinItem key={memecoin.id} memecoin={memecoin} />
          ))}
        </ul>
      )}
    </div>
  );
}