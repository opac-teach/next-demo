'use client';

import MemecoinItem from './MemecoinItem';
import { Memecoin } from '@/components/types/memecoin';


interface MemecoinListProps {
    memecoins: Memecoin[];
    loading: boolean;
}

export default function MemecoinList({ memecoins, loading }: MemecoinListProps) {
    if (loading) {
        return <div className="text-gray-500">Chargement des memecoins...</div>;
    }

    if (!memecoins.length) {
        return <div className="text-gray-500">Aucun memecoin trouvé.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {memecoins.map((memecoin) => (
                <MemecoinItem key={memecoin.id} memecoin={memecoin} />
            ))}
        </div>
    );
}