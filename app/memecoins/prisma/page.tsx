'use client';

import React, { useEffect, useState, startTransition } from 'react';
import Link from 'next/link';
import CreateMemecoinFormPrisma from '@/components/memecoins/prisma/CreateMemecoinFormPrisma';

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

    // Fonction pour récupérer les memecoins depuis l'API
    const fetchMemecoins = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/api/get-memecoins', {
                cache: 'no-store',
            });

            // Vérification explicite du statut HTTP
            if (!response.ok) {
                const errorMessage = `Erreur (${response.status}): ${response.statusText}`;
                console.error("fetchMemecoins:", errorMessage);
                throw new Error("Impossible de récupérer la liste des Memecoins.");
            }

            const data = await response.json();

            // Transition fluide pour la mise à jour de l'état
            startTransition(() => {
                setMemecoins(data);
            });
        } catch (err) {
            console.error("Erreur avec fetchMemecoins:", err);
            setError((err as Error).message || "Une erreur inattendue s'est produite.");
        } finally {
            setLoading(false);
        }
    };

    // Fonction exécutée à l'ajout d'un memecoin
    const handleAddMemecoin = () => {
        startTransition(() => {
            fetchMemecoins();
        });
    };

    // Chargement des données à l'initialisation et rechargement périodique
    useEffect(() => {
        fetchMemecoins();
        const interval = setInterval(() => fetchMemecoins(), 10000); // Mise à jour auto toutes les 10 secondes
        return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage
    }, []);

    return (
        <div className="container mx-auto p-4 relative">
            {/* Retour en haut à droite */}
            <div className="flex justify-end mb-4">
                <Link href="/memecoins" passHref>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Retour
                    </button>
                </Link>
            </div>

            <h1 className="text-2xl font-bold mb-4">Liste des Memecoins</h1>

            <CreateMemecoinFormPrisma onSuccess={handleAddMemecoin} />

            {/* Indicateur de chargement initial */}
            {loading && memecoins.length === 0 && (
                <p className="text-gray-500">Chargement des memecoins...</p>
            )}

            {/* Affichage des erreurs */}
            {error && (
                <div className="text-red-500 bg-red-100 border border-red-400 px-4 py-3 rounded mb-4">
                    Erreur : {error}
                </div>
            )}

            {/* Liste des memecoins */}
            {!error && memecoins.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {memecoins.map((memecoin) => (
                        <Link key={memecoin.id} href={`/memecoins/prisma/${memecoin.id}`} passHref>
                            <div
                                className="border p-4 rounded shadow cursor-pointer hover:shadow-lg transition-shadow"
                                suppressHydrationWarning
                            >
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

            {/* Indicateur de mise à jour pendant un rechargement */}
            {loading && memecoins.length > 0 && (
                <div className="text-gray-500 text-sm fixed top-4 left-4 bg-gray-100 px-2 py-1 rounded shadow">
                    Mise à jour des données en cours...
                </div>
            )}
        </div>
    );
}