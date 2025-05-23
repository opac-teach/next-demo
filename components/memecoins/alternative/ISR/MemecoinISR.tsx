import MemecoinView from '@/components/memecoins/alternative/Base_commune/Memecoin';
import { Memecoin } from '@/components/types/memecoin';


export default async function MemecoinISR() {
    try {
        const response = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins', {
            next: { revalidate: 10 }, // Mise à jour toutes les 10 secondes
        });

        // Vérification de la validité de la réponse
        if (!response.ok) {
            throw new Error(`Erreur serveur : ${response.status} ${response.statusText}`);
        }

        const memecoins: Memecoin[] = await response.json();

        // Validation du format des données reçues
        if (!Array.isArray(memecoins)) {
            throw new Error('Les données reçues ne sont pas valides.');
        }

        return (
            <div>
                <h1 className="text-lg font-semibold mb-4">Liste des Mémecoins</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {memecoins.map((memecoin) => (
                        <MemecoinView key={memecoin.id} memecoin={memecoin} />
                    ))}
                </div>
            </div>
        );
    } catch (err: unknown) {
        // Gestion des erreurs et affichage d'un fallback approprié
        const errorMessage =
            err instanceof Error
                ? err.message
                : 'Une erreur inconnue est survenue.';

        return (
            <div>
                <h1 className="text-lg font-semibold mb-4">Erreur</h1>
                <p className="text-red-500">{`Impossible de récupérer les mémecoins : ${errorMessage}`}</p>
            </div>
        );
    }
}