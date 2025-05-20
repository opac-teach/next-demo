import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
    name: string;
    symbol: string;
    description: string;
    logoUrl: string;
};

export default function CreateMemecoinForm({ onSuccess }: { onSuccess: () => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            symbol: '',
            description: '',
            logoUrl: '',
        },
    });

    const [serverMessage, setServerMessage] = useState<string | null>(null); // État pour afficher les messages serveur

    const validationRules = {
        name: {
            required: 'Le nom est requis.',
            minLength: { value: 4, message: 'Le nom doit contenir au moins 4 caractères.' },
            maxLength: { value: 16, message: 'Le nom ne doit pas dépasser 16 caractères.' },
        },
        symbol: {
            required: 'Le symbole est requis.',
            pattern: {
                value: /^[A-Z]{2,4}$/,
                message: 'Le symbole doit contenir entre 2 et 4 lettres majuscules.',
            },
        },
        description: {
            maxLength: {
                value: 1000,
                message: 'La description ne peut pas dépasser 1000 caractères.',
            },
        },
        logoUrl: {
            maxLength: {
                value: 200,
                message: 'L’URL du logo ne peut pas dépasser 200 caractères.',
            },
            validate: (url: string) => {
                try {
                    new URL(url);
                    return true;
                } catch {
                    return 'L’URL du logo est invalide.';
                }
            },
        },
    };

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création du memecoin.');
            }

            reset();
            setServerMessage('Memecoin créé avec succès !'); // Affiche le message de succès
            onSuccess();
        } catch (err) {
            setServerMessage((err as Error).message); // Affiche le message d'erreur
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow mb-6">
            <h2 className="text-xl font-bold mb-4">Créer un Memecoin</h2>

            {/* Champ Nom */}
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">
                    Nom <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    {...register('name', validationRules.name)}
                    className="mt-1 block w-full border rounded px-3 py-2"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Champ Symbole */}
            <div className="mb-4">
                <label htmlFor="symbol" className="block text-sm font-medium">
                    Symbole <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="symbol"
                    {...register('symbol', validationRules.symbol)}
                    className="mt-1 block w-full border rounded px-3 py-2"
                />
                {errors.symbol && <p className="text-red-500 text-sm">{errors.symbol.message}</p>}
            </div>

            {/* Champ Description */}
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                    id="description"
                    {...register('description', validationRules.description)}
                    className="mt-1 block w-full border rounded px-3 py-2"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            {/* Champ URL du logo */}
            <div className="mb-4">
                <label htmlFor="logoUrl" className="block text-sm font-medium">
                    URL du Logo
                </label>
                <input
                    type="url"
                    id="logoUrl"
                    {...register('logoUrl', validationRules.logoUrl)}
                    className="mt-1 block w-full border rounded px-3 py-2"
                />
                {errors.logoUrl && <p className="text-red-500 text-sm">{errors.logoUrl.message}</p>}
            </div>

            {/* Bouton Soumettre */}
            <div>
                <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className={`px-4 py-2 bg-blue-500 text-white rounded ${
                        !isValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                    }`}
                >
                    {isSubmitting ? 'Envoi...' : 'Créer'}
                </button>
            </div>

            {/* Affichage des messages serveur */}
            {serverMessage && (
                <p
                    className={`mt-4 text-sm ${
                        serverMessage.includes('succès') ? 'text-green-500' : 'text-red-500'
                    }`}
                >
                    {serverMessage}
                </p>
            )}
        </form>
    );
}