'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar({ authenticated }: { authenticated: boolean }) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.replace('/login')
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/memecoins" className="text-xl font-bold">
          Memecoin App
        </Link>
        {!authenticated ? (
          <Link
            href="/login"
            className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
          >
            Se connecter
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
          >
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  )
}