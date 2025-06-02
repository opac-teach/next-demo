import { PrismaClient } from '@/lib/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { memecoinId, userId, quantity, type } = await request.json(); // type: "buy" ou "sell"

        const memecoin = await prisma.memecoin.findUnique({ where: { id: memecoinId } });
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!memecoin || !user) {
            return NextResponse.json({ error: 'Memecoin ou utilisateur non trouvé.' }, { status: 404 });
        }

        const slope = 0.01; // Pente pour le modèle mathématique
        const intercept = 1; // Prix de base

        if (type === "buy") {
            // Calcul du coût d'achat selon la formule
            const cost = (slope * ((memecoin.supply + quantity) ** 2 - memecoin.supply ** 2)) / 2 + intercept * quantity;

            if (user.zthBalance < cost) {
                return NextResponse.json({ error: 'Solde insuffisant en ZTH.' }, { status: 400 });
            }

            // Mise à jour des données
            const updatedUser = await prisma.user.update({
                where: { id: user.id },
                data: { zthBalance: user.zthBalance - cost },
            });

            const updatedMemecoin = await prisma.memecoin.update({
                where: { id: memecoin.id },
                data: { supply: memecoin.supply + quantity, liquidity: memecoin.liquidity + cost },
            });

            return NextResponse.json({
                success: true,
                updatedUser,
                updatedMemecoin,
            });
        }

        if (type === "sell") {
            // Calcul des revenus de la vente
            const reward = (slope * (memecoin.supply ** 2 - (memecoin.supply - quantity) ** 2)) / 2 + intercept * quantity;

            if (memecoin.liquidity < reward) {
                return NextResponse.json({ error: 'Liquidité insuffisante.' }, { status: 400 });
            }

            // Mise à jour des données
            const updatedUser = await prisma.user.update({
                where: { id: user.id },
                data: { zthBalance: user.zthBalance + reward },
            });

            const updatedMemecoin = await prisma.memecoin.update({
                where: { id: memecoin.id },
                data: { supply: memecoin.supply - quantity, liquidity: memecoin.liquidity - reward },
            });

            return NextResponse.json({
                success: true,
                updatedUser,
                updatedMemecoin,
            });
        }

        return NextResponse.json({ error: "Type d'opération non valide." }, { status: 400 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
    }
}