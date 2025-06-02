import Link from 'next/link'
import { Memecoin } from './Memecoin'

export default function MemecoinItem({ coin }: { coin: Memecoin }) {
  return (
    <Link href={`/memecoins/${coin.id}`} className="block border p-4 rounded hover:bg-gray-50">
    <div className="border p-4 rounded shadow">
      <div className="flex items-center space-x-4">
        <img src={coin.logoUrl} alt={coin.name} className="w-12 h-12 object-contain" />
        <div>
          <h2 className="text-lg font-semibold">{coin.name} ({coin.symbol})</h2>
          <p>{coin.description}</p>
        </div>
      </div>
    </div>
    </Link>
  )
}