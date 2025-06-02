import { checkAuthentication } from "@/app/service/api/auth";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";




export default async function Header() {
  const links = [
    { href: "/demos", label: "Demos" },
    { href: "/posts", label: "Posts" },
  ];

  if(await checkAuthentication()){
    links.push({ href: "/memecoins", label: "Memecoins" })
    links.push({ href: "/logout", label: "Se Déconnecter" })
  } else {
    links.push({ href: "/login", label: "Se Connecter" })
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
      </div>
    </header>
  );
}
