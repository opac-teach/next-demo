import { useMemo, useCallback } from 'react';
import Link from 'next/link';

interface Memecoin {
  id: string;
  name: string;
  symbol: string;
  description: string;
  logoUrl: string;
  createdAt: Date | string;
  price?: number;
  marketCap?: number;
  volume24h?: number;
  change24h?: number;
  rank?: number;
  owner: string;
}

export default function MemecoinDetails({ memecoin }: { memecoin: Memecoin }) {
  const formattedDate = useMemo(() => {
    return new Date(memecoin.createdAt).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [memecoin.createdAt]);

  const formatCurrency = useCallback((value?: number) => {
    if (value === undefined) return 'N/A';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'ZTH',
    }).format(value);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center mb-8">
        <img 
          src={memecoin.logoUrl} 
          alt={memecoin.name} 
          width={300} 
          height={300} 
          className="rounded-full mb-4 shadow-md"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{memecoin.name}</h1>
        <p className="text-xl text-gray-600 mb-4">Symbole : {memecoin.symbol}</p>
      </div>

      <div className="space-y-4 text-gray-700">
        <p className="border-b pb-2"><span className="font-semibold">Description :</span> {memecoin.description}</p>
        <p className="border-b pb-2"><span className="font-semibold">Créé le :</span> {formattedDate}</p>
        <p className="border-b pb-2"><span className="font-semibold">Propriétaire :</span> {memecoin.owner}</p>
        <p className="border-b pb-2"><span className="font-semibold">Prix :</span> {formatCurrency(memecoin.price)}</p>
        <p className="border-b pb-2"><span className="font-semibold">Market Cap :</span> {formatCurrency(memecoin.marketCap)}</p>
        <p className="border-b pb-2"><span className="font-semibold">Volume 24h :</span> {formatCurrency(memecoin.volume24h)}</p>
        <p className="border-b pb-2"><span className="font-semibold">Changement 24h :</span> {memecoin.change24h ?? 'N/A'}%</p>
        <p className="border-b pb-2"><span className="font-semibold">Rang :</span> {memecoin.rank ?? 'N/A'}</p>
      </div>

      <Link 
        href="/memecoins" 
        className="inline-block mt-8 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        ← Retour
      </Link>
    </div>
  );
}