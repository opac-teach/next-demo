import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {cookies} from "next/headers";
import {User} from "@/app/generated/prisma";
import {getUser} from "@/lib/userUtils";

const links = [
    {href: "/demos", label: "Demos"},
    {href: "/posts", label: "Posts"},
    {href: "/prisma/coins", label: "MemeCoin"},
];

const loginLinks = [
    {href: "/login", label: "Login"},
    {href: "/logout", label: "Logout"},
];

export default async function Header() {

    const isLoggedIn: User | null = await getUser();

    const loginLink = isLoggedIn ? loginLinks[1] : loginLinks[0];

    return (
        <header className="bg-white border-b">
            <div className="flex items-center justify-between p-4">
                {!isLoggedIn ?
                    <Link href="/" className="text-xl font-light">
                        NextJS Demo App
                    </Link>
                    :
                    <Link href="/" className="text-xl font-light">
                        Bonjour {isLoggedIn.name} !
                    </Link>
                }

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
                        <NavigationMenuItem key={loginLink.href}>
                            <NavigationMenuLink
                                asChild
                                className={navigationMenuTriggerStyle()}
                            >
                                <Link href={loginLink.href} passHref>
                                    {loginLink.label}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
}
