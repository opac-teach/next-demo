import { NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Valider les données
        const { name, symbol, description, logoUrl } = body;
        if (!name || !symbol || !logoUrl) {
            return NextResponse.json({ error: 'Les champs name, symbol et logoUrl sont requis.' }, { status: 400 });
        }

        // Créer le memecoin dans la base de données
        const memecoin = await prisma.memecoin.create({
            data: {
                name,
                symbol,
                description: description || null,
                logoUrl,
            },
        });

        return NextResponse.json(memecoin, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
    }
}