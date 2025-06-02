import { Memecoin } from '@/types/memecoin';

export default function MemecoinCard({ memecoin }: { memecoin: Memecoin }) {
    return (
        <a href={`/memecoins/${memecoin.id}`} className="block border border-gray-300 m-4 p-4 no-underline text-current">
            <img src={memecoin.logoUrl} alt={`${memecoin.name} logo`} style={{ width: '50px' }} />
            <h2>{memecoin.name} ({memecoin.symbol})</h2>
            <p>{memecoin.description}</p>
            <small>Owner: {memecoin.owner}</small>
        </a>
    );
}
