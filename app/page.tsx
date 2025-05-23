import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900">
      <section className="text-center px-4 py-16 max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Memecoin Lab</h1>
        <p className="text-base mb-8">
          Explore et crée des memecoins simplement, avec Next.js 14.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/memecoins"
            className="px-6 py-2 border border-gray-900 rounded hover:bg-gray-100 transition"
          >
            Voir les memecoins
          </Link>
          <Link
            href="/login"
            className="px-6 py-2 border border-gray-900 rounded hover:bg-gray-100 transition"
          >
            Se connecter
          </Link>
        </div>
      </section>

      <section className="w-full px-4 py-8 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature
            title="Performance"
            description="Streaming SSR & ISR pour un rendu rapide"
          />
          <Feature
            title="Sécurité"
            description="JWT, cookies httpOnly & middleware"
          />
          <Feature
            title="Extensible"
            description="Server Actions, Zod & React-Hook-Form"
          />
        </div>
      </section>
    </div>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 border rounded text-center">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
}
