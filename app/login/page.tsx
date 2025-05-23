"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState, startTransition } from "react";
import { useRouter } from "next/navigation";

interface LoginFormInputs {
    password: string;
}

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Indicateur de chargement
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const router = useRouter();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setError(null); // Réinitialisation des erreurs
        setLoading(true);

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Transition non bloquante pour le redirection
                startTransition(() => {
                    window.location.reload();
                    router.push("/"); // Redirige vers la page d'accueil ou une destination spécifique
                });
            } else {
                const resData = await response.json();
                setError(resData.error || "Erreur inconnue lors de la connexion."); // Message d'erreur précis
            }
        } catch (err) {
            console.error("Erreur de connexion :", err); // Log pour le développeur
            setError("Une erreur s'est produite. Veuillez vérifier votre connexion et réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h1 className="text-lg font-bold mb-4">Connexion</h1>

                {/* Affichage du message d'erreur */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mot de passe :
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: "Le mot de passe est requis." })}
                            placeholder="Entrez votre mot de passe"
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                                errors.password ? "border-red-500" : "border-gray-300"
                            } focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        />
                        {/* Affichage des validations côté formulaire */}
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`w-full text-white rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                            loading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        disabled={loading} // Désactivation du bouton si le formulaire est en cours de traitement
                    >
                        {loading ? "Connexion en cours..." : "Se connecter"}
                    </button>
                </form>
            </div>
        </div>
    );
}