import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

interface LoginRequestBody {
    email: string;
    password: string;
}

export async function POST(request: Request) {
    try {
        const body: LoginRequestBody = await request.json();

        if (!SECRET_KEY) {
            throw new Error("JWT_SECRET environment variable is not defined");
        }

        // Cherchez l'utilisateur en fonction de l'email
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Email ou mot de passe incorrect." },
                { status: 401 }
            );
        }

        // Vérifiez le mot de passe
        const isPasswordValid = await bcrypt.compare(body.password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Email ou mot de passe incorrect." },
                { status: 401 }
            );
        }

        // Générer un token JWT
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

        // Réponse avec le cookie sécurisé
        const response = NextResponse.json({ message: "Connexion réussie" });
        response.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600, // 1 heure
            sameSite: "lax",
            path: "/",
        });
        return response;
    } catch (error) {
        console.error("Erreur de connexion :", error);
        return NextResponse.json(
            { error: "Une erreur est survenue lors de la connexion." },
            { status: 500 }
        );
    }
}