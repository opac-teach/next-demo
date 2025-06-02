'use client';

import { useState } from 'react';

export default function MemecoinTrade({
                                          memecoinId,
                                          userId,
                                          availableQuantity,
                                          userBalance, // Nouvelle propriété pour la balance ZTH de l'utilisateur
                                      }: {
    memecoinId: string;
    userId: string;
    availableQuantity: number;
    userBalance: number; // La balance ZTH de l'utilisateur
}) {
    const [quantity, setQuantity] = useState<number>(0);
    const [message, setMessage] = useState<string | null>(null);

    const handleMint = async () => {
        const response = await fetch('/api/mint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ memecoinId, userId, tokensToMint: quantity }),
        });

        const data = await response.json();
        if (response.ok) {
            setMessage(`Achat réussi : ${quantity} tokens achetés !`);
        } else {
            setMessage(data.error ?? 'Une erreur est survenue.');
        }
    };

    const handleBurn = async () => {
        const response = await fetch('/api/burn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ memecoinId, userId, tokensToBurn: quantity }),
        });

        const data = await response.json();
        if (response.ok) {
            setMessage(`Vente réussie : ${quantity} tokens vendus !`);
        } else {
            setMessage(data.error ?? 'Une erreur est survenue.');
        }
    };

    return (
        <div className="trade-container">
            <h3 className="text-lg font-bold">Trader des Memecoins</h3>
            <p className="text-gray-600">
                <span className="font-bold">Quantité disponible :</span> {availableQuantity} tokens
            </p>
            <p className="text-gray-600">
                <span className="font-bold">Votre solde ZTH :</span> {userBalance} ZTH
            </p>

            {message && <p className="text-green-600">{message}</p>}

            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border p-2 rounded"
                placeholder="Quantité"
            />

            <div className="flex gap-2 mt-2">
                <button
                    onClick={handleMint}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Acheter
                </button>
                <button
                    onClick={handleBurn}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Vendre
                </button>
            </div>
        </div>
    );
}