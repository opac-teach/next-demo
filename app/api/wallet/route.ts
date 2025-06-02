import { PrismaClient } from '@/lib/generated/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token || !SECRET_KEY) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }

        const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                zthBalance: true,
                UserHolding: { // Utilisez le nom exact de la relation défini dans Prisma
                    select: {
                        id: true,
                        memecoin: {
                            select: {
                                id: true,
                                name: true,
                                symbol: true,
                            },
                        },
                        quantity: true,
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}