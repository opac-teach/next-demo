"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { use } from "react";

interface Memecoin {
    id: string;
    name: string;
    description: string;
    logoUrl: string;
    owner: string;
    symbol: string;
}

const MemecoinsPageId = ({ params }: { params: Promise<{ id: string }> }) => {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [memecoin, setMemecoin] = useState<Memecoin | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getMemecoin = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://nuxt-demo-blush.vercel.app/api/get-memecoins/${id}`);

            if (!response.ok || response.status !== 200) {
                setMemecoin(null);
                throw new Error("Échec de récupération du memecoin");
            }

            const data = await response.json();

            if (data && typeof data === "object") {
                setMemecoin(data);
            } else {
                console.error("Format de données inattendu:", data);
                setMemecoin(null);
            }

        } catch (error) {
            console.error("Erreur lors de la récupération du memecoin:", error);
            setMemecoin(null);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        getMemecoin();
    }, [getMemecoin]);

    return (
        <div className="container mx-auto px-4 py-8">
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl font-medium text-gray-600">Chargement...</p>
                </div>
            ) : memecoin ? (
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center space-x-4 mb-6">
                            {memecoin.logoUrl && (
                                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                                    <Image
                                        src={memecoin.logoUrl}
                                        alt={memecoin.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <h1 className="text-3xl font-bold">{memecoin.name}</h1>
                                <p className="text-lg text-gray-500 uppercase">{memecoin.symbol}</p>
                            </div>
                        </div>

                        <div className="border-t border-b py-4 my-4">
                            <h2 className="text-xl font-semibold mb-2">Description</h2>
                            <p className="text-gray-700 whitespace-pre-line">{memecoin.description}</p>
                        </div>

                        <div className="pt-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Identifiant:</span>
                                <span className="font-medium">{memecoin.id}</span>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <span className="text-gray-500">Propriétaire:</span>
                                <span className="font-medium">{memecoin.owner}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-semibold text-gray-700">Memecoin introuvable</h2>
                    <p className="mt-2 text-gray-500">Le memecoin que vous recherchez n existe pas ou a été supprimé.</p>
                </div>
            )}
        </div>
    );
}

export default MemecoinsPageId;