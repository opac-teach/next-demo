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
    const [loading, setLoading] = useState<boolean>(false);
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

            // Utiliser startTransition pour effectuer une mise à jour fluide
            startTransition(() => {
                setMemecoins(data);
            });
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMemecoins();
        const interval = setInterval(() => fetchMemecoins(), 10000); // Rechargement automatique toutes les 10 secondes
        return () => clearInterval(interval);
    }, []);

    const handleAddMemecoin = () => {
        // Lorsque vous créez un nouveau memecoin, rechargez les données ensuite
        startTransition(() => {
            fetchMemecoins();
        });
    };

    return (
        <div className="container mx-auto p-4 relative">
            {/* Bouton placé en haut à droite */}
            <div className="absolute top-4 right-4 flex space-x-2">
                <Link href="/memecoins/alternative" passHref>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Accéder à la page de memecoins alternative
                    </button>
                </Link>
                <Link href="/memecoins/prisma" passHref>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Accéder à la page de memecoins interne (prisma)
                    </button>
                </Link>
            </div>
            {/* Contenu principal */}
            <h1 className="text-2xl font-bold mb-4">Liste des Memecoins</h1>

            <CreateMemecoinForm onSuccess={handleAddMemecoin} />

            {/* Indicateur de chargement si l'utilisateur attend les données initiales */}
            {loading && memecoins.length === 0 && (
                <p className="text-gray-500">Chargement des memecoins...</p>
            )}
            {error && <div className="text-red-500">Erreur : {error}</div>}

            {/* Liste des memecoins */}
            {!error && memecoins.length > 0 && (
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
            )}

            {/* Indicateur de mise à jour pendant un rechargement */}
            {loading && memecoins.length > 0 && (
                <div className="text-gray-500 text-sm fixed top-4 left-4 bg-gray-100 px-2 py-1 rounded shadow">
                    🔄 Mise à jour en arrière-plan...
                </div>
            )}
        </div>
    );
}