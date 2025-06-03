import Link from 'next/link';

interface Memecoin {
  id: string;
  name: string;
  symbol: string;
  description?: string;
  logoUrl?: string;
}

interface MemecoinItemProps {
  memecoin: Memecoin;
}

export default function MemecoinItem({ memecoin }: MemecoinItemProps) {
  if (!memecoin) {
    return <div className="p-4 border rounded-md bg-gray-100">Memecoin non disponible</div>;
  }

  const logoUrl = memecoin.logoUrl || 'https://via.placeholder.com/150?text=Memecoin';

  return (
    <Link href={`/memecoins/${memecoin.id}`}>
      <div className="p-4 border rounded-md hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
            <img 
              src={logoUrl} 
              alt={`Logo ${memecoin.name}`} 
              className="object-cover w-full h-full"
            />
            </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{memecoin.name}</h3>
                <p className="text-gray-600 font-mono">${memecoin.symbol}</p>
                <p className="text-gray-600 font-mono">{memecoin.price} ZTH</p>
              </div>
            </div>
            
            {memecoin.description && (
              <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                {memecoin.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
