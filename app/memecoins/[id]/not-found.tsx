
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Memecoin introuvable</h2>
        <p className="text-gray-600 mb-8">
          Le memecoin que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Link href="/memecoins" className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Retour à la liste des memecoins
        </Link>
      </div>
    </div>
  );
}