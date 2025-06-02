import { PrismaClient } from '@/lib/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise<{ symbol: string }> }) {
    try {
        const memecoin = await prisma.memecoin.findFirst({
            where: { symbol: (await params).symbol },
        });

        if (!memecoin) {
            return NextResponse.json({ error: "Memecoin non trouvé." }, { status: 404 });
        }

        const userHoldings = await prisma.userHolding.findMany({
            where: { memecoinId: memecoin.id },
            include: {
                user: { select: { id: true, email: true } }, // Les infos de l'utilisateur
            },
        });


        return NextResponse.json({
            memecoin,
            holdings: userHoldings.map((holding) => ({
                user: holding.user,
                quantity: holding.quantity,
            })),
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur lors de la récupération des holdings." }, { status: 500 });
    }
}