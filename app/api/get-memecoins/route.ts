import { NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// Gestionnaire GET pour la route `/api/get-memecoins`
export async function GET() {
    try {
        // Récupère tous les Memecoins dans la base
        const memecoins = await prisma.memecoin.findMany();
        return NextResponse.json(memecoins);
    } catch (error) {
        console.error('Erreur lors de la récupération des memecoins :', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des memecoins.' },
            { status: 500 }
        );
    }
}