"use client";

import { Memecoin } from "@/components/types/memecoin";
import { use } from "react";
import MemecoinView from "@/components/memecoins/alternative/Base_commune/Memecoin";

export default function MemecoinStreamingCSR({
                                                 memecoinPromise,
                                             }: {
    memecoinPromise: Promise<Memecoin[]>; // Accepter un tableau de memecoins
}) {
    const memecoins = use(memecoinPromise); // Récupérer la liste complète des memecoins depuis la promise
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Streaming des Memecoins</h1>
            {/* Parcourir et afficher chaque memecoin */}
            {memecoins.map((memecoin) => (
                <MemecoinView key={memecoin.id} memecoin={memecoin} />
            ))}
        </div>
    );
}