import { NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        // Récupérez le memecoin spécifique selon l'ID
        const memecoin = await prisma.memecoin.findUnique({
            where: { id },
        });

        if (!memecoin) {
            return NextResponse.json(
                { error: 'Memecoin non trouvé.' },
                { status: 404 }
            );
        }

        return NextResponse.json(memecoin);
    } catch (error) {
        console.error('Erreur lors de la récupération du memecoin :', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération du memecoin.' },
            { status: 500 }
        );
    }
}