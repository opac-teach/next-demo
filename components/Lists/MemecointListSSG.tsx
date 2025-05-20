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
    const response = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins', {
      cache: 'force-cache'
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

export default async function MemecoinListSSG() {
  const memecoins = await getMemecoins();
  const generatedTime = new Date().toLocaleString();

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-col mb-6">
        <h2 className="text-xl font-bold">{memecoins.length} memecoins trouvés (SSG)</h2>
        <div className="text-sm text-gray-500 mt-2">
          Cette liste est statique et générée au moment du build.
          Date de génération : {generatedTime}
        </div>
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