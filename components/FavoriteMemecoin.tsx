"use client";

import { useState, useEffect, useCallback } from 'react';

interface FavoriteMemecoinProps {
  defaultName?: string;
}

export default function FavoriteMemecoin({ defaultName = '' }: FavoriteMemecoinProps) {
  const [favMemecoin, setFavMemecoin] = useState(defaultName);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem('favoriteMemecoin');
    if (storedValue) {
      setFavMemecoin(storedValue);
    }
  }, []);

  const handleSave = useCallback(() => {
    if (favMemecoin.trim()) {
      localStorage.setItem('favoriteMemecoin', favMemecoin);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }, [favMemecoin]);

  const handleClear = useCallback(() => {
    localStorage.removeItem('favoriteMemecoin');
    setFavMemecoin('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-lg font-bold mb-4">Votre Memecoin Préféré</h2>
      
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={favMemecoin}
          onChange={(e) => setFavMemecoin(e.target.value)}
          placeholder="Entrez le nom de votre memecoin préféré"
          className="border rounded p-2"
        />
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Sauvegarder
          </button>
          <button
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Effacer
          </button>
        </div>
        {saved && (
          <div className="text-green-600 font-semibold">
            Préférence mise à jour avec succès!
          </div>
        )}
        {favMemecoin && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p><strong>Votre memecoin préféré:</strong> {favMemecoin}</p>
            <p className="text-sm text-gray-500">Cette valeur est stockée dans le localStorage.</p>
          </div>
        )}
      </div>
    </div>
  );
}