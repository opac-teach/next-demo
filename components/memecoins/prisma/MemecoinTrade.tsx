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

    const handleTrade = async () => {
        try {
            const response = await fetch('/api/trading/trade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ memecoinId, userId, quantity, type: operationType }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Une erreur est survenue.');
            }

            const data = await response.json();

            setMessage(
                operationType === "buy"
                    ? `Achat réussi : ${quantity} tokens achetés pour ${price.toFixed(2)} ZTH !`
                    : `Vente réussie : ${quantity} tokens vendus pour ${price.toFixed(2)} ZTH !`
            );

            setAvailableQuantity(data.updatedMemecoin.supply);
            setUserBalance(data.updatedUser.zthBalance);
            setLiquidity(data.updatedMemecoin.liquidity);

            // Réinitialiser la quantité après l'opération réussie
            setQuantity(0);
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message || 'Une erreur inattendue est survenue.'
                    : 'Une erreur inattendue est survenue.'
            );
        }
    };

    return (
        <div className="trade-container bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {operationType === "buy" ? "Acheter" : "Vendre"} des Memecoins
            </h2>
            <div className="mb-4">
                <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                    Quantité :
                </label>
                <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
                    className="w-full border rounded-lg p-2"
                    placeholder="Entrez la quantité"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="operationType" className="block text-gray-700 font-medium mb-2">
                    Type d&#39;opération :
                </label>
                <select
                    id="operationType"
                    value={operationType}
                    onChange={(e) => setOperationType(e.target.value as "buy" | "sell")}
                    className="w-full border rounded-lg p-2"
                >
                    <option value="buy">Acheter</option>
                    <option value="sell">Vendre</option>
                </select>
            </div>

            <div className="mb-4 text-gray-700">
                <p>
                    <strong>Total {operationType === "buy" ? "coût" : "gain"} :</strong>{" "}
                    {price.toFixed(2)} ZTH
                </p>
                <p>
                    <strong>Votre solde actuel :</strong> {userBalance.toFixed(2)} ZTH
                </p>
                <p>
                    <strong>Quantité disponible :</strong> {availableQuantity} tokens
                </p>
                <p>
                    <strong>Liquidité :</strong> {liquidity.toFixed(2)} ZTH
                </p>
            </div>

            <button
                onClick={handleTrade}
                disabled={quantity <= 0 || (operationType === "buy" && price > userBalance) || (operationType === "sell" && quantity > availableQuantity)}
                className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                    quantity <= 0 ||
                    (operationType === "buy" && price > userBalance) ||
                    (operationType === "sell" && quantity > availableQuantity)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                }`}
            >
                {operationType === "buy" ? "Acheter" : "Vendre"}
            </button>

            {message && (
                <div
                    className={`mt-4 p-4 rounded-lg text-white ${
                        message.toLowerCase().includes("erreur") ? "bg-red-500" : "bg-green-500"
                    }`}
                >
                    {message}
                </div>
            )}
        </div>
    );
}