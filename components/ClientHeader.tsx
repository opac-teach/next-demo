"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions"; // Importez la fonction de déconnexion

export default function ClientHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Appeler l'action serveur pour supprimer le cookie
            await logout();
            // Rediriger vers la page d'accueil
            router.push("/");
        } catch (error) {
            console.error("Erreur lors de la déconnexion : ", error);
        }
    };

    return (
        <>
            {isLoggedIn ? (
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                    Se déconnecter
                </button>
            ) : (
                <div className="flex space-x-4">
                    <a
                        href="/login"
                        className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                        Se connecter
                    </a>
                    <a
                        href="/register"
                        className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                        S&#39;inscrire
                    </a>
                </div>
            )}
        </>
    );
}