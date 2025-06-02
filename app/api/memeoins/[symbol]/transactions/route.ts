import { PrismaClient } from '@/lib/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { symbol: string } }) {
    try {
        const memecoin = await prisma.memecoin.findFirst({
            where: { symbol: params.symbol },
        });

        if (!memecoin) {
            return NextResponse.json({ error: "Memecoin non trouvé." }, { status: 404 });
        }


        const transactions = await prisma.transaction.findMany({
            where: { memecoinId: memecoin.id },
            include: { user: true }, // Inclure les informations sur l'utilisateur
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(transactions);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erreur lors de la récupération des transactions.' }, { status: 500 });
    }
}