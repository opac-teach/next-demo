'use client';

interface Memecoin {
    id: string;
    name: string;
    symbol: string;
    description: string;
    logoUrl: string;
}

export default function MemecoinItem({ memecoin }: { memecoin: Memecoin }) {
    return (
        <div className="border p-4 rounded shadow">
            <img
                src={memecoin.logoUrl}
                alt={memecoin.name}
                className="w-16 h-16 mb-2 rounded-full object-cover"
            />
            <h2 className="text-xl font-semibold">
                {memecoin.name} ({memecoin.symbol})
            </h2>
            {memecoin.description && <p className="text-gray-600">{memecoin.description}</p>}
        </div>
    );
}