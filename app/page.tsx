import Link from 'next/link';
import Convert from '../components/test';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Memecoin Lab</h1>
        <p className="text-gray-700 mt-2">
          Découvrez et créez des memecoins facilement avec Next.js 14.
        </p>
      </header>

      <nav className="mb-12 space-x-4">
        <Link
          href="/memecoins"
          className="text-blue-600 hover:underline"
        >
          Voir la liste des memecoins
        </Link>
        <Link
          href="/login"
          className="text-blue-600 hover:underline"
        >
          Se connecter
        </Link>

        <Convert/>

      </nav>
    </div>
  );
}
