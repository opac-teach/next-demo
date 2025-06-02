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
    const [messageType, setMessageType] = useState<"success" | "error" | null>(null); // Type de message
    const [operationType, setOperationType] = useState<"buy" | "sell">("buy"); // Option choisie
    const [price, setPrice] = useState<number>(0); // Calcul du coût ou revenu
    const [isLoading, setIsLoading] = useState<boolean>(false); // Indicateur de chargement

    // Recalcul du prix en fonction de la quantité sélectionnée et du type d'opération
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

    // Gestion des transactions avec une gestion améliorée des erreurs
    const handleTrade = async () => {
        setIsLoading(true); // Activer l'indicateur de chargement
        setMessage(null); // Réinitialiser le message
        setMessageType(null);

        try {
            const response = await fetch('/api/trading/trade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ memecoinId, userId, quantity, type: operationType }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur inconnue du serveur.');
            }

            const data = await response.json();

            setMessage(
                operationType === "buy"
                    ? `Achat réussi : ${quantity} tokens achetés pour ${price.toFixed(2)} ZTH !`
                    : `Vente réussie : ${quantity} tokens vendus pour ${price.toFixed(2)} ZTH !`
            );
            setMessageType("success");

            setAvailableQuantity(data.updatedMemecoin.supply);
            setUserBalance(data.updatedUser.zthBalance);
            setLiquidity(data.updatedMemecoin.liquidity);

            // Réinitialiser la quantité après une opération réussie
            setQuantity(0);
        } catch (error) {
            if (error instanceof Error) {
                setMessage(error.message || 'Une erreur inattendue est survenue.');
            } else {
                setMessage('Une erreur inattendue est survenue.');
            }
            setMessageType("error");
        } finally {
            setIsLoading(false); // Désactiver l'indicateur de chargement
        }
    };

    return (
        <div className="trade-container bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Trader des Memecoins</h2>

            {/* Champ de saisie de quantité */}
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

            {/* Informations sur le coût ou le gain */}
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

            {/* Boutons Acheter / Vendre */}
            <div className="mb-4 flex justify-between">
                <button
                    className={`w-full py-2 px-4 rounded-lg font-medium mr-2 ${
                        operationType === "buy"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={() => setOperationType("buy")}
                >
                    Acheter
                </button>
                <button
                    className={`w-full py-2 px-4 rounded-lg font-medium ${
                        operationType === "sell"
                            ? "bg-red-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={() => setOperationType("sell")}
                >
                    Vendre
                </button>
            </div>
            {/* Bouton Valider */}
            <div className="flex flex-col items-center">
                <button
                    onClick={handleTrade}
                    disabled={
                        isLoading ||
                        quantity <= 0 ||
                        (operationType === "buy" && price > userBalance) ||
                        (operationType === "sell" && quantity > availableQuantity)
                    }
                    className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                        isLoading ||
                        quantity <= 0 ||
                        (operationType === "buy" && price > userBalance) ||
                        (operationType === "sell" && quantity > availableQuantity)
                            ? "bg-gray-400 cursor-not-allowed"
                            : operationType === "buy"
                                ? "bg-indigo-600 hover:bg-indigo-700"
                                : "bg-red-600 hover:bg-red-700"
                    }`}
                >
                    {isLoading
                        ? "Chargement..."
                        : operationType === "buy"
                            ? "Acheter"
                            : "Vendre"}
                </button>

                {/* Message explicatif si le bouton est grisé */}
                <p className="mt-2 text-red-500 text-sm">
                    {isLoading
                        ? "L'opération est en cours, veuillez patienter..."
                        : quantity <= 0
                            ? "Veuillez saisir une quantité valide."
                            : operationType === "buy" && price > userBalance
                                ? "Vous n'avez pas assez de solde pour cet achat."
                                : operationType === "sell" && quantity > availableQuantity
                                    ? "Il y a pas assez de tokens disponibles pour cette vente."
                                    : ""}
                </p>
            </div>

            {/* Message de succès ou d'erreur */}
            {message && (
                <div
                    className={`mt-4 p-4 rounded-lg ${
                        messageType === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"
                    }`}
                >
                    {message}
                </div>
            )}
        </div>
    );
}