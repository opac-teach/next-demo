import MemecoinListRSC from '@/components/Lists/MemecoinListRSC';
import MemecoinListCSR from '@/components/Lists/MemecoinListCSR';
import MemecoinListISR from '@/components/Lists/MemecoinListISR';
import MemecoinListSSG from '@/components/Lists/MemecointListSSG';
import MemecoinListStreaming from '@/components/Lists/MemecoinListStreaming';
import FavoriteMemecoin from '@/components/FavoriteMemecoin';

export const metadata = {
  title: 'Alternatives de fetching - Memecoins',
  description: 'Démonstration des différentes méthodes de récupération de données dans Next.js',
};

export default function AlternativesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Alternatives de Récupération de Données</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">LocalStorage Component</h2>
        <FavoriteMemecoin />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">RSC (React Server Component)</h2>
          <MemecoinListRSC />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">CSR (Client-Side Rendering)</h2>
          <MemecoinListCSR />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">ISR (Incremental Static Regeneration)</h2>
          <MemecoinListISR />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">SSG (Static Site Generation)</h2>
          <MemecoinListSSG />
        </section>

        <section className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Streaming avec Suspense</h2>
          <MemecoinListStreaming />
        </section>
      </div>
    </div>
  );
}