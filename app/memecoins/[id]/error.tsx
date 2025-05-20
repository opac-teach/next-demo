'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Erreur lors du chargement du memecoin:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Une erreur est survenue</h2>
        <p className="text-gray-600 mb-8">
          Impossible de charger les détails du memecoin. Veuillez réessayer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Réessayer
          </button>
          <Link 
            href="/memecoins"
            className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Retour à la liste
          </Link>
        </div>
      </div>
    </div>
  );
}