'use client';

import { useEffect, useState, startTransition } from 'react';
import Link from 'next/link';
import CreateMemecoinForm from '@/components/memecoins/CreateMemecoinForm';

interface Memecoin {
    id: string;
    name: string;
    symbol: string;
    description: string;
    logoUrl: string;
}

export default function MemecoinsPage() {
    const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMemecoins = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins', {
                cache: 'no-store',
            });
            if (!response.ok) throw new Error('Impossible de récupérer la liste des Memecoins.');

            const data = await response.json();

            // Utiliser startTransition pour réduire les blocages sur l'interface
            startTransition(() => {
                setMemecoins(data);
            });
        } catch (err) {
            startTransition(() => {
                setError((err as Error).message);
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMemecoins();
        const interval = setInterval(() => fetchMemecoins(), 10000);
        return () => clearInterval(interval);
    }, []);

    const handleAddMemecoin = () => {
        // Utilisation de startTransition pour empêcher une mauvaise expérience utilisateur
        startTransition(() => {
            fetchMemecoins();
        });
    };

    return (
        <div className="container mx-auto p-4 relative">
            {/* Bouton placé en haut à droite */}
            <div className="absolute top-4 right-4">
                <Link href="/memecoins/alternative" passHref>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Accéder à la page de memecoins alternative
                    </button>
                </Link>
            </div>

            {/* Contenu principal */}
            <h1 className="text-2xl font-bold mb-4">Liste des Memecoins</h1>

            <CreateMemecoinForm onSuccess={handleAddMemecoin} />

            {loading && !memecoins && <p className="text-gray-500">Chargement des memecoins...</p>}
            {error && <div className="text-red-500">Erreur : {error}</div>}

            {!loading && !error && memecoins.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {memecoins.map((memecoin) => (
                        <Link key={memecoin.id} href={`/memecoins/${memecoin.id}`} passHref>
                            <div className="border p-4 rounded shadow cursor-pointer hover:shadow-lg transition-shadow">
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
                        </Link>
                    ))}
                </div>
            ) : (
                !loading && !error && <p className="text-gray-500">Aucun memecoin trouvé.</p>
            )}
        </div>
    );
}