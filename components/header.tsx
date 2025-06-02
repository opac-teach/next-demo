"use client";

import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { handleLogout } from "@/lib/actions";

const links = [
  { href: "/demos", label: "Demos" },
  { href: "/posts", label: "Posts" },
  { href: "/memecoins", label: "Memecoins" },
];

export default function Header() {
  // Ajout d'un état pour stocker les informations de session
  const [session, setSession] = useState<{ isAuthenticated: boolean; user?: any } | null>(null);

  // Récupérer la session au chargement du composant
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/check-auth");
        const data = await response.json();
        setSession(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la session:", error);
        setSession({ isAuthenticated: false });
      }
    };

    checkSession();
  }, []);


  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-light">
          NextJS Demo App
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={link.href} passHref>
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            {session?.isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                onClick={() => handleLogout()}
              >
                Déconnexion
              </Button>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/login" passHref>
                    Connexion
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
