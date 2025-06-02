import Link from 'next/link'
import { Memecoin } from './Memecoin'

export default function MemecoinItem({ coin }: { coin: Memecoin }) {
  return (
    <Link
      href={`/memecoins/${coin.id}`}
      className="block bg-white/90 border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:border-green-400 transition p-4"
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <img
            src={coin.logoUrl}
            alt={coin.name}
            className="w-16 h-16 object-contain rounded-full border border-gray-100 shadow"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-green-700 mb-1">
            {coin.name} <span className="text-gray-500 font-normal">({coin.symbol})</span>
          </h2>
          <p className="text-gray-600 text-sm line-clamp-2">{coin.description || 'Aucune description.'}</p>
        </div>
      </div>
    </Link>
  )
}