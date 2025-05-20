'use client';

import React, { useState, useEffect } from 'react';

interface MemecoinStorageProps {
    storageKey: string; // Clé du localStorage personnalisable
    placeholder?: string; // Texte d'invite pour le champ de saisie
    label?: string; // Label du champ
}

export default function Storage({
                                    storageKey,
                                    placeholder = 'Entrez une donnée...',
                                    label = 'Donnée :',
                                }: MemecoinStorageProps) {
    const [value, setValue] = useState<string>('');
    const [storedValue, setStoredValue] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs

    // Charger les données de localStorage au montage
    useEffect(() => {
        try {
            const savedValue = localStorage.getItem(storageKey);
            if (savedValue) {
                setStoredValue(savedValue);
            }
        } catch (err: unknown) {
            // Capture et affichage d'erreur
            if (err instanceof Error) {
                setError(`Impossible de charger les données : ${err.message}`);
            } else {
                setError('Une erreur inconnue est survenue lors du chargement des données.');
            }
        }
    }, [storageKey]);

    // Gestion de la sauvegarde dans le localStorage
    const handleSave = () => {
        try {
            if (value) {
                localStorage.setItem(storageKey, value);
                setStoredValue(value); // Met à jour l'affichage avec la nouvelle valeur
                setValue(''); // Réinitialise le champ de saisie
                setError(null); // Réinitialise les erreurs en cas de succès
            }
        } catch (err: unknown) {
            // Capture et affichage d'erreur
            if (err instanceof Error) {
                setError(`Erreur lors de la sauvegarde : ${err.message}`);
            } else {
                setError('Une erreur inconnue est survenue lors de la sauvegarde.');
            }
        }
    };

    return (
        <div className="p-4 border rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Stocker une donnée dans le localStorage</h2>

            {/* Affichage des messages d'erreur */}
            {error && <p className="text-red-500 mb-4">Erreur : {error}</p>}

            {/* Champ de saisie */}
            <div className="mb-4">
                <label htmlFor={storageKey} className="block text-sm font-medium mb-1">
                    {label}
                </label>
                <input
                    type="text"
                    id={storageKey}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder={placeholder}
                />
            </div>

            {/* Bouton pour sauvegarder */}
            <button
                type="button"
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Sauvegarder dans localStorage
            </button>

            {/* Afficher les données stockées */}
            {storedValue && (
                <p className="mt-4 text-green-600">
                    Valeur enregistrée (<strong>{storageKey}</strong>) : <strong>{storedValue}</strong>
                </p>
            )}
        </div>
    );
}