"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

// Configuration des liens du menu
const links = [
    { href: "/demos", label: "Demos" },
    { href: "/posts", label: "Posts" },
    { href: "/memecoins", label: "Memecoins" }
];

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const router = useRouter();

    // Vérification de la connexion au chargement
    useEffect(() => {
        const token = Cookies.get("auth_token");
        setIsLoggedIn(!!token);
    }, []);

    // Gestion de la déconnexion
    const handleLogout = () => {
        Cookies.remove("auth_token"); // Supprime le token des cookies
        setIsLoggedIn(false); // Mise à jour directe de l'état
        router.replace("/"); // Redirige vers la page d'accueil après déconnexion
    };

    // Gestion de la connexion
    const handleLogin = () => {
        router.replace("/login"); // Redirection vers l'accueil (ou toute autre page)
    };

    // Pendant le chargement initial
    if (isLoggedIn === null) {
        return (
            <header className="bg-white border-b">
                <div className="flex items-center justify-between p-4">
                    <Link href="/" className="text-xl font-light">
                        NextJS Demo App
                    </Link>
                    <nav>
                        <span>Chargement...</span>
                    </nav>
                </div>
            </header>
        );
    }

    return (
        <header className="bg-white border-b">
            <div className="flex items-center justify-between p-4">
                {/* Titre de l'application - lien vers l'accueil */}
                <Link href="/" className="text-xl font-light">
                    NextJS Demo App
                </Link>

                {/* Menu de navigation */}
                <NavigationMenu>
                    <NavigationMenuList>
                        {links.map((link) => (
                            <NavigationMenuItem key={link.href}>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href={link.href} passHref>
                                        {link.label}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}

                        <NavigationMenuItem>
                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                                >
                                    Se déconnecter
                                </button>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                >
                                    Se connecter
                                </button>
                            )}
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
}