import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import LogoutButton from "@/components/auth/Logout-btn";

const links = [
  { href: "/demos", label: "Demos" },
  { href: "/posts", label: "Posts" },
  { href: "/memecoins", label: "Memecoin" },
];

export default async function Header() {
  const session = await getServerSession(authOptions);

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
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              {session ? (
                <LogoutButton />
              ) : (
                <Link href="/login" className={navigationMenuTriggerStyle()}>
                  Connexion
                </Link>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}