import MemecoinView from '@/components/memecoins/alternative/Base_commune/Memecoin';
import { Memecoin } from '@/components/types/memecoin';

export default async function MemecoinRSC() {
    const response = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins');
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des mémecoins.');
    }

    const memecoins: Memecoin[] = await response.json();

    return (
        <div>
            <h1 className="text-lg font-semibold mb-4">Liste des Mémecoins</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {memecoins.map((memecoin) => (
                    <MemecoinView key={memecoin.id} memecoin={memecoin} />
                ))}
            </div>
        </div>
    );
}