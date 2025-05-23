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

    // Fonction pour récupérer les Memecoins
    const fetchMemecoins = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins', {
                cache: 'no-store',
            });

            // Vérification explicite du statut HTTP
            if (!response.ok) {
                const errorMessage = `Erreur (${response.status}): ${response.statusText}`;
                console.error("fetchMemecoins:", errorMessage);
                throw new Error('Impossible de récupérer la liste des Memecoins.');
            }

            const data = await response.json();

            // Transition fluide pour la mise à jour de l'état
            startTransition(() => {
                setMemecoins(data);
            });
        } catch (err) {
            console.error("Erreur lors de la récupération des Memecoins:", err);
            setError((err as Error).message || 'Erreur inconnue. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    // Réactions lors de l'ajout de memecoins
    const handleAddMemecoin = () => {
        startTransition(() => {
            fetchMemecoins();
        });
    };

    // Chargement initial et mise à jour automatique
    useEffect(() => {
        fetchMemecoins();
        const interval = setInterval(fetchMemecoins, 10000); // Mise à jour auto toutes les 10 secondes
        return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage
    }, []);

    return (
        <div className="container mx-auto p-4 relative">
            {/* Boutons de navigation en haut */}
            <div className="flex justify-end mb-4">
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

            {/* Formulaire d'ajout */}
            <CreateMemecoinForm onSuccess={handleAddMemecoin} />

            {/* Titre principal */}
            <h1 className="text-2xl font-bold mb-4">Liste des Memecoins</h1>

            {/* Indicateurs pour l'utilisateur */}
            {loading && memecoins.length === 0 && (
                <p className="text-gray-500">Chargement des memecoins...</p>
            )}
            {error && (
                <div className="text-red-500 bg-red-100 border border-red-400 px-4 py-3 rounded mb-4">
                    Erreur : {error}
                </div>
            )}

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
                                {memecoin.description && (
                                    <p className="text-gray-600">{memecoin.description}</p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Charges lors de la mise à jour */}
            {loading && memecoins.length > 0 && (
                <div className="text-gray-500 text-sm fixed top-4 left-4 bg-gray-200 px-2 py-1 rounded shadow">
                    Mise à jour des données en cours...
                </div>
            )}
        </div>
    );
}