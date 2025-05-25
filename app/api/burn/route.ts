import { PrismaClient } from '@/lib/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { memecoinId, tokensToBurn, userId } = await request.json();

        // Récupérer le memecoin
        const memecoin = await prisma.memecoin.findUnique({ where: { id: memecoinId } });
        if (!memecoin || tokensToBurn > memecoin.supply || tokensToBurn <= 0) {
            return NextResponse.json({ error: 'Quantité invalide ou supply insuffisante.' }, { status: 400 });
        }

        // Récupérer l'utilisateur
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json({ error: 'Utilisateur non trouvé.' }, { status: 404 });
        }

        const a = 0.01; // Pente
        const b = 1;    // Prix initial
        const currentSupply = memecoin.supply;

        // Calcul du montant à rembourser
        const reward = (a * (currentSupply ** 2 - (currentSupply - tokensToBurn) ** 2)) / 2 + (b * tokensToBurn);

        // Vérification des liquidités
        if (memecoin.liquidity < reward) {
            return NextResponse.json({ error: 'Liquidité insuffisante dans la réserve.' }, { status: 400 });
        }

        // Mise à jour memecoin et utilisateur
        const updatedMemecoin = await prisma.memecoin.update({
            where: { id: memecoinId },
            data: { supply: currentSupply - tokensToBurn, liquidity: memecoin.liquidity - reward },
        });

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { zthBalance: user.zthBalance + reward },
        });

        return NextResponse.json({ memecoin: updatedMemecoin, user: updatedUser });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}