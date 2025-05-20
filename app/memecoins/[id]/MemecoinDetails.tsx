import Image from 'next/image';
import Link from 'next/link';

// Interface pour le memecoin
interface Memecoin {
  id: string;
  name: string;
  symbol: string;
  description?: string;
  logoUrl?: string;
  createdAt?: string;
  price?: number;
  marketCap?: number;
  volume24h?: number;
  change24h?: number;
  rank?: number;
}

interface MemecoinDetailsProps {
  memecoin: Memecoin;
}

export default function MemecoinDetails({ memecoin }: MemecoinDetailsProps) {
  const logoUrl = memecoin.logoUrl || 'https://via.placeholder.com/300?text=Memecoin';

  const formattedDate = memecoin.createdAt 
    ? new Date(memecoin.createdAt).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Date inconnue';

  const formatCurrency = (value?: number) => {
    if (value === undefined) return 'N/A';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value);
  };

  const formatPercentage = (value?: number) => {
    if (value === undefined) return 'N/A';
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/memecoins" className="text-blue-500 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour à la liste
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center mb-8 gap-6">
        <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full overflow-hidden">
          <Image
            src={logoUrl}
            alt={`Logo ${memecoin.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, 128px"
            unoptimized={!memecoin.logoUrl}
            priority
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">{memecoin.name}</h1>
              <p className="text-xl text-gray-600 font-mono">${memecoin.symbol}</p>
            </div>

            {memecoin.price !== undefined && (
              <div className="mt-2 md:mt-0 text-right">
                <p className="text-2xl font-semibold">{formatCurrency(memecoin.price)}</p>
                {memecoin.change24h !== undefined && (
                  <p className={`text-sm font-medium ${memecoin.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(memecoin.change24h)} (24h)
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {memecoin.description && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-700 whitespace-pre-line">{memecoin.description}</p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Informations</h2>
        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul className="divide-y divide-gray-200">
            <li className="px-4 py-3 flex justify-between">
              <span className="text-gray-600">ID</span>
              <span className="font-mono">{memecoin.id}</span>
            </li>
            <li className="px-4 py-3 flex justify-between">
              <span className="text-gray-600">Date de création</span>
              <span>{formattedDate}</span>
            </li>
            {memecoin.rank !== undefined && (
              <li className="px-4 py-3 flex justify-between">
                <span className="text-gray-600">Rang</span>
                <span>#{memecoin.rank}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Statistiques du marché</h2>
        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul className="divide-y divide-gray-200">
            {memecoin.price !== undefined && (
              <li className="px-4 py-3 flex justify-between">
                <span className="text-gray-600">Prix</span>
                <span>{formatCurrency(memecoin.price)}</span>
              </li>
            )}
            {memecoin.marketCap !== undefined && (
              <li className="px-4 py-3 flex justify-between">
                <span className="text-gray-600">Capitalisation</span>
                <span>{formatCurrency(memecoin.marketCap)}</span>
              </li>
            )}
            {memecoin.volume24h !== undefined && (
              <li className="px-4 py-3 flex justify-between">
                <span className="text-gray-600">Volume (24h)</span>
                <span>{formatCurrency(memecoin.volume24h)}</span>
              </li>
            )}
            {memecoin.change24h !== undefined && (
              <li className="px-4 py-3 flex justify-between">
                <span className="text-gray-600">Évolution (24h)</span>
                <span className={memecoin.change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatPercentage(memecoin.change24h)}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}