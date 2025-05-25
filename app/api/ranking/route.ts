import { PrismaClient } from '@/lib/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Récupérer les 10 utilisateurs ayant les plus hauts totaux ZTH
        const leaderboard = await prisma.user.findMany({
            orderBy: { zthBalance: 'desc' },
            take: 10, // Limiter au top 10
            select: {
                id: true,
                email: true,
                zthBalance: true,
                createdAt: true,
            },
        });

        return NextResponse.json({ leaderboard });
    } catch (error) {
        console.error('Erreur lors de la récupération du classement :', error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération du classement" },
            { status: 500 }
        );
    }
}