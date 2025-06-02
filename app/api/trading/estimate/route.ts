import { PrismaClient } from '@/lib/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { memecoinId, quantity, type } = await request.json();

        const memecoin = await prisma.memecoin.findUnique({ where: { id: memecoinId } });
        if (!memecoin) {
            return NextResponse.json({ error: 'Memecoin non trouvé.' }, { status: 404 });
        }

        const slope = 0.01;
        const intercept = 1;

        let estimatedPrice = 0;

        if (type === "buy") {
            estimatedPrice = (slope * ((memecoin.supply + quantity) ** 2 - memecoin.supply ** 2)) / 2 + intercept * quantity;
        } else if (type === "sell") {
            estimatedPrice = (slope * (memecoin.supply ** 2 - (memecoin.supply - quantity) ** 2)) / 2 + intercept * quantity;
        } else {
            return NextResponse.json({ error: "Type d'opération invalide." }, { status: 400 });
        }

        return NextResponse.json({ type, estimatedPrice });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
    }
}