import { PrismaClient } from '@/lib/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { memecoinId, tokensToMint, userId } = await request.json();

        // Récupérer le memecoin
        const memecoin = await prisma.memecoin.findUnique({ where: { id: memecoinId } });
        if (!memecoin) {
            return NextResponse.json({ error: 'Memecoin non trouvé.' }, { status: 404 });
        }

        // Récupérer l'utilisateur
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || tokensToMint <= 0) {
            return NextResponse.json({ error: 'Utilisateur introuvable ou quantité invalide.' }, { status: 400 });
        }

        const a = 0.01; // Pente
        const b = 1;    // Prix initial
        const currentSupply = memecoin.supply;

        // Calcul du coût
        const cost = (a * ((tokensToMint + currentSupply) ** 2 - currentSupply ** 2)) / 2 + (b * tokensToMint);

        // Vérification ZTH de l'utilisateur
        if (user.zthBalance < cost) {
            return NextResponse.json({ error: 'Solde insuffisant en ZTH.' }, { status: 400 });
        }

        // Mise à jour memecoin et utilisateur
        const updatedMemecoin = await prisma.memecoin.update({
            where: { id: memecoinId },
            data: { supply: currentSupply + tokensToMint, liquidity: memecoin.liquidity + cost },
        });

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { zthBalance: user.zthBalance - cost },
        });

        // Retourner les données nécessaires au front-end
        return NextResponse.json({
            success: true,
            totalCost: cost, // Coût total pour l'achat
            updatedSupply: updatedMemecoin.supply, // Quantité disponible mise à jour
            updatedBalance: updatedUser.zthBalance, // Solde utilisateur mis à jour
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}