"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface RegisterFormInputs {
    email: string;
    password: string;
}

export default function RegisterPage() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        setError(null);
        setLoading(true);

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                const resData = await response.json();
                setError(resData.error || "Une erreur s'est produite lors de l'inscription.");
            }
        } catch (err) {
            console.error("Erreur d'inscription :", err);
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h1 className="text-lg font-bold mb-4">Inscription</h1>

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                        Inscription réussie ! Vous pouvez désormais vous connecter.
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email :</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "L'email est requis.",
                                pattern: {
                                    value: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                    message: "Entrez une adresse email valide."
                                }
                            })}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                                errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe :</label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: "Le mot de passe est requis." })}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                                errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`w-full text-white rounded py-2 px-4 ${
                            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Inscription..." : "S'inscrire"}
                    </button>
                </form>
            </div>
        </div>
    );
}