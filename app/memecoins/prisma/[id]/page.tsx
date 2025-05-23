import { Metadata } from "next";
import React from "react";
import Link from "next/link";

interface Memecoin {
    id: string;
    name: string;
    symbol: string;
    description: string;
    logoUrl: string;
}

// Structure des erreurs typées
interface FetchResult<T> {
    data: T | null;
    error: string | null;
}

// Fonction fetch pour gérer les erreurs proprement depuis l'API
async function fetchMemecoin(id: string): Promise<FetchResult<Memecoin>> {
    try {
        const response = await fetch(`http://localhost:3000/api/get-memecoins/${id}`, { cache: "no-store" });

        // Vérification explicite des statuts HTTP
        if (!response.ok) {
            const errorMessage = `Erreur (${response.status}): ${response.statusText}`;
            console.error("fetchMemecoin:", errorMessage);
            return { data: null, error: "Impossible de récupérer les informations du memecoin." };
        }

        // Lecture et validation des données
        const data = await response.json();
        if (!data || typeof data !== "object" || Array.isArray(data)) {
            throw new Error("Données invalides reçues de l'API.");
        }

        return { data, error: null };
    } catch (error) {
        console.error("Erreur avec fetchMemecoin:", error);
        return { data: null, error: "Erreur interne. Veuillez réessayer plus tard." };
    }
}

// Gestion améliorée des métadonnées pour gérer les erreurs dans `generateMetadata`
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const { data: memecoin, error } = await fetchMemecoin(id);

    if (error || !memecoin) {
        const errorMessage = error || "Le memecoin est introuvable.";
        console.error("generateMetadata:", errorMessage);

        return {
            title: "Memecoin introuvable",
            description: "Le memecoin demandé est indisponible ou a été supprimé.",
            openGraph: {
                title: "Memecoin introuvable",
                description: "Le memecoin demandé est indisponible ou a été supprimé.",
            },
        };
    }

    return {
        title: `${memecoin.name} (${memecoin.symbol}) - Détails`,
        description: memecoin.description || "Aucune description disponible.",
        openGraph: {
            title: `${memecoin.name} (${memecoin.symbol})`,
            description: memecoin.description || "Aucune description disponible.",
            images: memecoin.logoUrl ? [memecoin.logoUrl] : undefined,
        },
    };
}

// Composant principal pour afficher les détails d'un memecoin avec une gestion renforcée des erreurs
export default async function MemecoinDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data: memecoin, error } = await fetchMemecoin(id);

    if (error || !memecoin) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-red-500">Memecoin introuvable</h1>
                <p className="mt-2 text-gray-600">
                    Le memecoin que vous recherchez n&#39;existe pas ou a été supprimé.
                </p>
                {error && <p className="text-sm text-gray-400 mt-1">{error}</p>}

                <div className="mt-4">
                    <Link href="/memecoins/prisma">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                            Retour
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-end mb-4">
                <Link href="/memecoins/prisma">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Retour
                    </button>
                </Link>
            </div>

            <div className="border p-4 rounded shadow">
                <img
                    src={memecoin.logoUrl} // Fallback pour le logo
                    alt={memecoin.name}
                    className="w-32 h-32 mb-4 rounded-full object-cover"
                />
                <h1 className="text-3xl font-bold">
                    {memecoin.name} ({memecoin.symbol})
                </h1>
                <p className="mt-2 text-gray-700">{memecoin.description || "Aucune description disponible."}</p>
            </div>
        </div>
    );
}