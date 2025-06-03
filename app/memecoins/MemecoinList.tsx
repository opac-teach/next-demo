import { revalidatePath } from 'next/cache';
import MemecoinItem from './MemecoinItem';

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

export default async function MemecoinList() {
  const memecoins = await getMemecoins();

  async function refreshMemecoins() {
    'use server';
    revalidatePath('/memecoins');
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">{memecoins.length} memecoins trouvés</p>
        <form action={refreshMemecoins}>
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Rafraîchir
          </button>
        </form>
      </div>

      {memecoins.length === 0 ? (
        <div className="p-8 border rounded-md text-center text-gray-500">
          Aucun memecoin trouvé
        </div>
      ) : (
        <div className="space-y-4">
          {memecoins.map((memecoin) => (
            <MemecoinItem key={memecoin.id} memecoin={memecoin} />
          ))}
        </div>
      )}
    </div>
  );
}
