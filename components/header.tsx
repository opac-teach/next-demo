import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ClientHeader from "@/components/ClientHeader";

const links = [
    { href: "/demos", label: "Demos" },
    { href: "/posts", label: "Posts" },
    { href: "/memecoins", label: "Memecoins" },
    { href: "/ranking", label: "Leaderboard" },
];

export default async function Header() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;
    const SECRET_KEY = process.env.JWT_SECRET;

    let isLoggedIn = false;

    if (authToken && SECRET_KEY) {
        try {
            // Vérification du token JWT côté serveur
            const decoded = jwt.verify(authToken, SECRET_KEY);
            if (decoded) {
                isLoggedIn = true;
            }
        } catch {
            // En cas de token expiré ou invalide
            isLoggedIn = false;
        }
    }

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
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href={link.href} passHref>
                                        {link.label}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}

                        <NavigationMenuItem>
                            <ClientHeader isLoggedIn={isLoggedIn} />
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
}