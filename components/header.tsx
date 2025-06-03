import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { isAuthenticated, getAuthenticatedUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/demos", label: "Demos" },
  { href: "/memecoins", label: "Memecoins" },
  { href: "/alternatives", label: "Alternatives" },
  { href: "/posts", label: "Posts" },
];

export default async function Header() {
  const user = await getAuthenticatedUser();

  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-light">
          NextJS Demo App
        </Link>

        <div className="flex items-center gap-4">
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
            </NavigationMenuList>
          </NavigationMenu>

          {user ? (
            <>
              <div className="text-sm text-gray-700">
                Bonjour, <strong>{user.username}</strong> — 💰 {user.balance.toFixed(2)} ZTH
              </div>
              <LogoutButton />
            </>
          ) : (
            <Button variant="default" asChild>
              <Link href="/login">Se connecter</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}