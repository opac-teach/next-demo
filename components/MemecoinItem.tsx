import Link from 'next/link';
import Image from 'next/image';

type Props = {
  memecoin: {
    id: string;
    name: string;
    symbol: string;
    logoUrl?: string;
  };
};

export default function MemecoinItem({ memecoin }: Props) {
  return (
    <li className="border rounded-xl p-4 flex items-center gap-4">
      {memecoin.logoUrl && (
        <Image
          src={memecoin.logoUrl}
          alt={memecoin.name}
          width={48}
          height={48}
          className="rounded-lg"
        />
      )}

      <div className="flex-1">
        <Link href={`/memecoins/${memecoin.id}`} className="font-semibold">
          {memecoin.name}
        </Link>
        <span className="text-sm text-gray-500 ml-2">({memecoin.symbol})</span>
      </div>
    </li>
  );
}
