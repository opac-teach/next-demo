'use client';

import { useEffect, useState } from 'react';
import MemecoinView from '@/components/memecoins/alternative/Base_commune/Memecoin';
import { Memecoin } from '@/components/types/memecoin';

export default function MemecoinCSR() {
    const [memecoins, setMemecoins] = useState<Memecoin[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Indicateur de chargement

    useEffect(() => {
        const fetchMemecoins = async () => {
            try {
                const response = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins');

                // Vérifier si la réponse est valide
                if (!response.ok) {
                    throw new Error(`Erreur serveur : ${response.status} ${response.statusText}`);
                }

                const data = await response.json();

                // Vérifier si les données sont conformes
                if (!Array.isArray(data)) {
                    throw new Error('Les données reçues ne sont pas valides.');
                }

                setMemecoins(data);
                setError(null); // Réinitialiser les erreurs en cas de succès
            } catch (err: unknown) {
                // Gestion d'erreur
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : 'Une erreur inconnue est survenue.';
                setError(errorMessage);
                setMemecoins(null); // Réinitialiser les données en cas d'erreur
            } finally {
                setIsLoading(false); // Fin du chargement
            }
        };

        fetchMemecoins();
    }, []);

    if (isLoading) return <p>Chargement des mémecoins...</p>;
    if (error) return <p className="text-red-500">{`Erreur : ${error}`}</p>;

    return (
        <div>
            <h1 className="text-lg font-semibold mb-4">Liste des Mémecoins</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {memecoins?.map((memecoin) => (
                    <MemecoinView key={memecoin.id} memecoin={memecoin} />
                ))}
            </div>
        </div>
    );
}