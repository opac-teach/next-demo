import { PrismaClient } from '@/lib/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(request: NextRequest) {
    try {
        // Récupérer le cookie auth_token
        const token = request.cookies.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Non authentifié. Veuillez vous connecter." },
                { status: 401 }
            );
        }

        // Vérifier et décoder le JWT pour obtenir le userId
        if (!SECRET_KEY) {
            throw new Error("La clé secrète JWT n'est pas configurée.");
        }

        let userId: string;
        try {
            const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
            userId = decoded.userId;
        } catch {
            return NextResponse.json(
                { error: "Token JWT invalide ou expiré. Veuillez vous reconnecter." },
                { status: 401 }
            );
        }

        // Lire les données envoyées dans le body
        const body = await request.json();
        const { name, symbol, description, logoUrl } = body;

        // Valider les données obligatoires (sans userId, car il est récupéré via le JWT)
        if (!name || !symbol || !logoUrl) {
            return NextResponse.json(
                { error: "Les champs name, symbol et logoUrl sont requis." },
                { status: 400 }
            );
        }

        // Récupérer l'utilisateur par son ID
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return NextResponse.json(
                { error: "Utilisateur introuvable." },
                { status: 404 }
            );
        }

        // Vérifier si l'utilisateur dispose d'au moins 1 ZTH
        if (user.zthBalance < 1) {
            return NextResponse.json(
                { error: "Solde insuffisant : 1 ZTH est requis pour créer un Memecoin." },
                { status: 400 }
            );
        }

        // Créer le memecoin
        const memecoin = await prisma.memecoin.create({
            data: {
                name,
                symbol,
                description: description || null,
                logoUrl,
            },
        });

        // Mettre à jour le solde utilisateur (-1 ZTH)
        await prisma.user.update({
            where: { id: userId },
            data: { zthBalance: user.zthBalance - 1 },
        });

        // Retourner les données du memecoin en réponse
        return NextResponse.json(memecoin, { status: 201 });
    } catch (error) {
        console.error("Erreur dans la création d'un memecoin :", error);
        return NextResponse.json(
            { error: "Erreur interne du serveur." },
            { status: 500 }
        );
    }
}