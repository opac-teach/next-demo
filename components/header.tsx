'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

interface HeaderProps {
  authenticated: boolean
}

const links = [
  { href: '/demos', label: 'Demos' },
  { href: '/posts', label: 'Posts' },
  { href: '/memecoins', label: 'MemeCoins' },
]

export default function Header({ authenticated }: HeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    })
    window.location.href = '/login'
  }

  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-light">
          NextJS Demo App
        </Link>
        <div className="flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              {links.map(link => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {!authenticated ? (
            <Link href="/login" className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
              Se connecter
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Déconnexion
            </button>
          )}
        </div>
      </div>
    </header>
  )
}