"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState, startTransition } from "react";
import { useRouter } from "next/navigation";

interface LoginFormInputs {
    password: string;
}

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const router = useRouter();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setError(null); // Réinitialisation des erreurs

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Utilisation de startTransition pour effectuer une transition non bloquante
                startTransition(() => {
                    window.location.reload();
                    router.push("/"); // Redirige vers la page d'accueil ou une autre page

                });
            } else {
                const resData = await response.json();
                setError(resData.error || "Erreur lors de la connexion.");
            }
        } catch  {
            setError("Impossible de se connecter. Veuillez réessayer.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h1 className="text-lg font-bold mb-4">Connexion</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mot de passe :
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: "Le mot de passe est requis" })}
                            placeholder="Entrez votre mot de passe"
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                                errors.password ? "border-red-500" : "border-gray-300"
                            } focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
}