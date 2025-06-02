import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { getCurrentUser } from "@/services/api/user";
import Link from "next/link";

import { UserOutlined,LoginOutlined } from '@ant-design/icons';

const links = [
  { href: "/demos", label: "Demos" },
  { href: "/posts", label: "Posts" },
  {href: "/memecoins", label: "Memecoins"},
];


export default async function Header() {
  
  const currentUser = await getCurrentUser();

  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-light">
          Accueil
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

         {
          currentUser ? (
            <Link href="/login" className="text-xl font-light">
              <UserOutlined className="bg-gray-200 p-2 rounded-3xl"/>
            </Link>
          ) : (
            <Link href="/login" className="text-xl font-light">
              <LoginOutlined className="bg-gray-200 p-2 rounded-3xl"/>
            </Link>
          )
        }

      </div>
    </header>
  );
}
