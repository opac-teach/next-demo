import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
// import { isAuth } from "@/services/auth";
import Link from "next/link";

// const isValid = isAuth()

const links = [
  { href: "/memecoins", label: "Memecoins" },
  { href: "/demos", label: "Demos" },
  { href: "/posts", label: "Posts" },
  // { href: "/login", label: "Account" },
];

export default function Header() {
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

        <Link href="/login">
          Account
        </Link>
      </div>
    </header>
  );
}
