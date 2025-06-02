import { Memecoin } from '@/types/memecoin';

export default function MemecoinCard({ memecoin }: { memecoin: Memecoin }) {
    return (
        <div style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
            <img src={memecoin.logoUrl} alt={`${memecoin.name} logo`} style={{ width: '50px' }} />
            <h2>{memecoin.name} ({memecoin.symbol})</h2>
            <p>{memecoin.description}</p>
            <small>Owner: {memecoin.owner}</small>
        </div>
    );
}
