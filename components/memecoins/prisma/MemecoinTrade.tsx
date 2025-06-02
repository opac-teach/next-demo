'use client';

import { useState, useEffect } from 'react';

export default function MemecoinTrade({
                                          memecoinId,
                                          userId,
                                          availableQuantity: initialAvailableQuantity,
                                          userBalance: initialUserBalance,
                                          slope = 0.01, // Pente pour le calcul des prix
                                          intercept = 1, // Prix initial
                                          liquidity: initialLiquidity,
                                      }: {
    memecoinId: string;
    userId: string;
    availableQuantity: number;
    userBalance: number;
    slope?: number;
    intercept?: number;
    liquidity: number;
}) {
    const [quantity, setQuantity] = useState<number>(0);
    const [availableQuantity, setAvailableQuantity] = useState<number>(initialAvailableQuantity);
    const [userBalance, setUserBalance] = useState<number>(initialUserBalance);
    const [liquidity, setLiquidity] = useState<number>(initialLiquidity);
    const [message, setMessage] = useState<string | null>(null);
    const [operationType, setOperationType] = useState<"buy" | "sell">("buy"); // Option choisie
    const [price, setPrice] = useState<number>(0); // Calcul du coût ou revenu

    useEffect(() => {
        if (quantity <= 0) {
            setPrice(0);
            return;
        }
        const currentSupply = availableQuantity;
        if (operationType === "buy") {
            const cost =
                (slope * ((quantity + currentSupply) ** 2 - currentSupply ** 2)) / 2 +
                intercept * quantity;
            setPrice(cost);
        } else {
            const earnings =
                (slope * (currentSupply ** 2 - (currentSupply - quantity) ** 2)) / 2 +
                intercept * quantity;
            setPrice(earnings);
        }
    }, [quantity, operationType, availableQuantity, slope, intercept]);

    const handleMint = async () => {
        const response = await fetch('/api/mint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ memecoinId, userId, tokensToMint: quantity }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage(`Achat réussi : ${quantity} tokens achetés pour ${price.toFixed(2)} ZTH !`);
            setAvailableQuantity(data.updatedSupply);
            setUserBalance(data.updatedBalance);
            setLiquidity(liquidity + price);
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
            setMessage(`Vente réussie : ${quantity} tokens vendus pour ${price.toFixed(2)} ZTH !`);
            setAvailableQuantity(data.updatedSupply);
            setUserBalance(data.updatedBalance);
            setLiquidity(liquidity - price);
        } else {
            setMessage(data.error ?? 'Une erreur est survenue.');
        }
    };

    const handleTrade = () => {
        if (operationType === "buy") {
            handleMint();
        } else {
            handleBurn();
        }
    };

    return (
        <div className="trade-container bg-white shadow-md rounded-lg p-6 mt-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Trader des Memecoins</h3>
            <div className="mb-4">
                <p className="text-gray-600">
                    <span className="font-bold">Quantité disponible :</span> {availableQuantity} tokens
                </p>
                <p className="text-gray-600">
                    <span className="font-bold">Votre solde ZTH :</span> {userBalance.toFixed(2)} ZTH
                </p>
                <p className="text-gray-600">
                    <span className="font-bold">Liquidité :</span> {liquidity.toFixed(2)} ZTH
                </p>
            </div>

            {message && (
                <p className="text-green-600 font-semibold mb-4 p-2 rounded bg-green-100">
                    {message}
                </p>
            )}

            <div className="flex gap-4 mt-4">
                <button
                    onClick={() => setOperationType("buy")}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
                        operationType === "buy"
                            ? "bg-blue-500 text-white shadow-lg"
                            : "border border-gray-400 bg-gray-100 text-gray-600"
                    }`}
                >
                    Acheter
                </button>
                <button
                    onClick={() => setOperationType("sell")}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
                        operationType === "sell"
                            ? "bg-red-500 text-white shadow-lg"
                            : "border border-gray-400 bg-gray-100 text-gray-600"
                    }`}
                >
                    Vendre
                </button>
            </div>

            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border p-2 rounded-md mt-6 w-full text-center text-lg focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Saisir la quantité"
            />

            <p className="text-gray-800 text-lg font-semibold mt-6">
                {operationType === "buy"
                    ? `Coût estimé : ${price.toFixed(2)} ZTH`
                    : `Revenu estimé : ${price.toFixed(2)} ZTH`}
            </p>

            <button
                onClick={handleTrade}
                className={`w-full mt-6 px-4 py-2 rounded-lg text-lg font-bold transition ${
                    operationType === "buy"
                        ? "bg-blue-500 text-white hover:bg-blue-600 shadow-md"
                        : "bg-red-500 text-white hover:bg-red-600 shadow-md"
                }`}
            >
                {operationType === "buy" ? "Confirmer l'achat" : "Confirmer la vente"}
            </button>
        </div>
    );
}