"use client"

import { useCallback, useEffect, useState } from "react";
import { MemecoinsCard } from "./memecoins-card";
import { MemecoinsForm } from "./memecoin-form";

interface Memecoin {
    id: string;
    name: string;
    symbol: string;
    logoUrl: string;
    description: string;
    owner: string;
}

const MemecoinsSection = () => {
    const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"list" | "create">("list");

    const getMemecoins = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch("https://nuxt-demo-blush.vercel.app/api/get-memecoins");

            if (!response.ok || response.status !== 200) {
                setMemecoins([]);
                throw new Error("Échec de récupération des memecoins");
            }

            const data = await response.json();

            if (data && Array.isArray(data.memecoins)) {
                setMemecoins(data.memecoins);
            } else if (data && Array.isArray(data)) {
                setMemecoins(data);
            } else {
                console.error("Format de données inattendu:", data);
                setMemecoins([]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des memecoins:", error);
            setMemecoins([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getMemecoins();
    }, [getMemecoins]);

    return (
        <section>
            <div className="mb-8">
                <p className="text-gray-600 mb-4">
                    Découvrez les memecoins les plus populaires du moment ou créez le vôtre.
                </p>

                <div className="flex border-b mb-6">
                    <button
                        className={`py-2 px-4 font-medium ${activeTab === 'list' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('list')}
                    >
                        Liste des memecoins
                    </button>
                    <button
                        className={`py-2 px-4 font-medium ${activeTab === 'create' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('create')}
                    >
                        Créer un memecoin
                    </button>
                </div>
            </div>

            {activeTab === 'list' && (
                isLoading ? (
                    <div className="text-center py-10">Chargement des memecoins...</div>
                ) : memecoins.length === 0 ? (
                    <div className="text-center py-10">Aucun memecoin trouvé</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {memecoins.map((memecoin) => (
                            <MemecoinsCard key={memecoin.id} memecoin={memecoin} />
                        ))}
                    </div>
                )
            )}

            {activeTab === 'create' && (
                <MemecoinsForm />
            )}
        </section>
    );
}

export default MemecoinsSection;