'use client';

import { Suspense, useEffect, useState } from 'react';
import MemecoinView from '@/components/memecoins/alternative/Base_commune/Memecoin';
import { Memecoin } from '@/components/types/memecoin';

function MemecoinData() {
    const [memecoins, setMemecoins] = useState<Memecoin[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMemecoins = async () => {
            try {
                const response = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins');

                // Vérifie si la réponse est correcte
                if (!response.ok) {
                    throw new Error(`Erreur du recuperation des memecoins : ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setMemecoins(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Une erreur inconnue est survenue.');
                }
            }
        };

        fetchMemecoins();
    }, []);

    if (error) {
        return <p className="text-red-500">Erreur : {error}</p>;
    }

    if (!memecoins) {
        return <p>Chargement des mémecoins...</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {memecoins.map((memecoin) => (
                <MemecoinView key={memecoin.id} memecoin={memecoin} />
            ))}
        </div>
    );
}

export default function MemecoinStreaming() {
    return (
        <Suspense fallback={<p>Chargement en streaming...</p>}>
            <MemecoinData />
        </Suspense>
    );
}