import { cookies } from 'next/headers'; // Pour accéder aux cookies côté serveur
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@/lib/generated/prisma';
import MemecoinTrade from '@/components/memecoins/prisma/MemecoinTrade';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

export default async function MemecoinDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    // Récupérer le memecoin via son ID
    const memecoin = await prisma.memecoin.findUnique({ where: { id: (await params).id } });
    if (!memecoin) {
        return <div>Error: Memecoin introuvable</div>;
    }

    // Récupérer le cookie "auth_token"
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token')?.value;

    // Décoder le JWT pour obtenir l'userId
    let userId: string | null = null;
    if (authToken && SECRET_KEY) {
        try {
            const decoded = jwt.verify(authToken, SECRET_KEY) as { userId: string };
            userId = decoded.userId; // Extraire l'ID de l'utilisateur
        } catch (err) {
            console.error('Token JWT invalide ou expiré.', err);
            return (
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold text-red-500">Erreur d&#39;authentification</h1>
                    <p>Vous devez être connecté pour accéder à cette page.</p>
                </div>
            );
        }
    }

    // Si aucun userId n'a été trouvé, afficher une erreur
    if (!userId) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-red-500">Erreur d&#39;authentification</h1>
                <p>Vous devez être connecté pour accéder à cette page.</p>
            </div>
        );
    }

    // Charger toutes les informations nécessaires pour l'utilisateur authentifié
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-red-500">Utilisateur introuvable</h1>
                <p>L&#39;utilisateur identifié n&#39;existe pas.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">
                {memecoin.name} ({memecoin.symbol})
            </h1>
            <p>{memecoin.description}</p>

            {/* Passer la quantité disponible et la balance utilisateur */}
            <MemecoinTrade
                memecoinId={memecoin.id}
                userId={userId}
                availableQuantity={memecoin.supply} // Quantité disponible
                userBalance={user.zthBalance} // Balance utilisateur
            />
        </div>
    );
}