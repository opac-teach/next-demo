import { revalidatePath } from 'next/cache';
import MemecoinItem from '../../app/memecoins/MemecoinItem';

interface Memecoin {
  id: string;
  name: string;
  symbol: string;
  description?: string;
  logoUrl?: string;
}

async function getMemecoins(): Promise<Memecoin[]> {
  try {
    const response = await fetch('http://localhost:3000/api/get-memecoins', {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des memecoins: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error('Réponse API incorrecte: les données ne sont pas un tableau');
      return [];
    }

    return data.filter(item =>
      item &&
      typeof item === 'object' &&
      'id' in item &&
      'name' in item &&
      'symbol' in item
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des memecoins:', error);
    return [];
  }
}

export default async function MemecoinListRSC() {
  const memecoins = await getMemecoins();

  async function refreshMemecoins() {
    'use server';
    revalidatePath('/memecoins');
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{memecoins.length} memecoins trouvés (RSC)</h2>
        <form action={refreshMemecoins}>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Rafraîchir
          </button>
        </form>
      </div>

      {memecoins.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          Aucun memecoin trouvé
        </p>
      ) : (
        <ul className="space-y-4">
          {memecoins.map((memecoin) => (
            <MemecoinItem key={memecoin.id} memecoin={memecoin} />
          ))}
        </ul>
      )}
    </div>
  );
}