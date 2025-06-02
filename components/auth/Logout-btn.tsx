'use client';

import { signOut } from "next-auth/react";
import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default function LogoutButton() {
  return (
    <NavigationMenuLink
      asChild
      className={navigationMenuTriggerStyle()}
    >
      <button
        type="button"
        onClick={() => signOut()}
        className="w-full text-left"
      >
        Déconnexion
      </button>
    </NavigationMenuLink>
  );
}