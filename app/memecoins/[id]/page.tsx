import { Metadata } from "next";
import React from "react";

interface Memecoin {
    id: string;
    name: string;
    symbol: string;
    description: string;
    logoUrl: string;
}

async function fetchMemecoin(id: string): Promise<{ data: Memecoin | null; error: string | null }> {
    try {
        const response = await fetch(`https://nuxt-demo-blush.vercel.app/api/get-memecoins/${id}`, {
            cache: "no-store", // Garanti des données fraîches
        });

        if (!response.ok) {
            // Si l'API retourne une erreur, capturez un message explicite
            return { data: null, error: "Erreur lors de la récupération du memecoin." };
        }

        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        console.error("Erreur avec fetchMemecoin:", error);
        return { data: null, error: "Erreur interne du serveur." };
    }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const { data: memecoin, error } = await fetchMemecoin(id);

    if (error || !memecoin) {
        return {
            title: "Memecoin introuvable",
            description: "Le memecoin demandé est introuvable ou a été supprimé.",
            openGraph: {
                title: "Memecoin introuvable",
                description: "Le memecoin demandé est introuvable ou a été supprimé.",
            },
        };
    }

    return {
        title: `${memecoin.name} (${memecoin.symbol}) - Détails`,
        description: memecoin.description,
        openGraph: {
            title: `${memecoin.name} (${memecoin.symbol})`,
            description: memecoin.description,
            images: memecoin.logoUrl ? [memecoin.logoUrl] : undefined,
        },
    };
}

export default async function MemecoinDetailsPage({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params
    const { data: memecoin, error } = await fetchMemecoin(id);

    if (error || !memecoin) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-red-500">Memecoin introuvable</h1>
                <p>
                    Le memecoin que vous recherchez n&#39;existe pas ou a été supprimé.
                    <br />
                    {error && <span className="text-sm text-gray-500">{error}</span>}
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="border p-4 rounded shadow">
                <img
                    src={memecoin.logoUrl}
                    alt={memecoin.name}
                    className="w-32 h-32 mb-4 rounded-full object-cover"
                />
                <h1 className="text-3xl font-bold">
                    {memecoin.name} ({memecoin.symbol})
                </h1>
                <p className="mt-2 text-gray-700">{memecoin.description}</p>
            </div>
        </div>
    );
}