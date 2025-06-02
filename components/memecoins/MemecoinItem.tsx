import Link from 'next/link';
import { Memecoin } from '@/lib/types';

export default function MemecoinItem({ memecoin }: { memecoin: Memecoin }) {
  return (
    <li className="border rounded flex gap-4 bg-white/80 shadow-sm hover:shadow transition-all">
      <div className="flex-shrink-0">
        {memecoin.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={memecoin.logoUrl}
            alt={memecoin.name}
            width={64}
            height={64}
            className="rounded-full"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-gray-500">{memecoin.symbol.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow gap-1 overflow-hidden text-ellipsis line-clamp-3 break-words">
        <Link href={`/memecoins/${memecoin.id}`} className="font-semibold text-lg hover:text-blue-600">
          {memecoin.name}
        </Link>
        <span className="text-gray-600">Symbol: {memecoin.symbol}</span>
        {memecoin.price !== undefined && (
          <span className="text-green-700">Price: ${memecoin.price.toFixed(6)}</span>
        )}
        {memecoin.description && (
          <p className="text-gray-500 text-sm line-clamp-2">{memecoin.description}</p>
        )}
        {memecoin.createdAt && (
          <span className="text-xs text-gray-400 mt-2">
            Added: {new Date(memecoin.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </li>
  );
}