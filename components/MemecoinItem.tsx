import Link from 'next/link'
import { Memecoin } from '@/types/memcoin'

export default function MemecoinItem({ coin }: { coin: Memecoin }) {
  return (
    <Link
      href={`/memecoins/${coin.id}`}
      className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition"
    >
      {coin.logoUrl && (
        <img
          src={coin.logoUrl}
          alt={coin.name}
          className="w-12 h-12 rounded-full"
        />
      )}
      <div>
        <h3 className="text-lg font-semibold">
          {coin.name}{' '}
          <span className="text-sm text-gray-500">({coin.symbol})</span>
        </h3>
        {coin.description && <p className="text-sm">{coin.description}</p>}
      </div>
    </Link>
  )
}
