import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@/lib/generated/prisma';
import MemecoinTrade from '@/components/memecoins/prisma/MemecoinTrade';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

export default async function MemecoinDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const [memecoin] = await Promise.all([
        prisma.memecoin.findUnique({ where: { id: (await params).id } }),
    ]);
    if (!memecoin) {
        return <div>Error: Memecoin introuvable</div>;
    }

    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token')?.value;

    let userId: string | null = null;
    if (authToken && SECRET_KEY) {
        try {
            const decoded = jwt.verify(authToken, SECRET_KEY) as { userId: string };
            userId = decoded.userId;
        } catch (err) {
            console.error('Token JWT invalide ou expiré.', err);
        }
    }

    const user = await prisma.user.findUnique({ where: { id: userId || undefined } });
    if (!user) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-red-500">Utilisateur introuvable</h1>
                <p>L&#39;utilisateur identifié n&#39;existe pas.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
            {/* Section pour afficher l'image et les détails côte à côte */}
            <div className="flex items-center space-x-4">
                <img
                    src={memecoin.logoUrl}
                    alt={memecoin.name}
                    className="w-16 h-16 rounded-full"
                />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {memecoin.name} <span className="text-lg text-gray-500">({memecoin.symbol})</span>
                    </h1>
                </div>
            </div>

            <p className="text-gray-700 text-lg mt-4">{memecoin.description}</p>
            <MemecoinTrade
                memecoinId={memecoin.id}
                userId={userId || ''}
                availableQuantity={memecoin.supply}
                userBalance={user.zthBalance}
                liquidity={memecoin.liquidity}
                slope={0.01}
                intercept={1}
            />
        </div>
    );
}
