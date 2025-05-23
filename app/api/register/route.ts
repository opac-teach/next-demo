import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();
interface RegisterRequestBody {
    email: string;
    password: string;
}

export async function POST(request: Request) {
    try {
        const body: RegisterRequestBody = await request.json();

        // Vérification si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Un utilisateur avec cet email existe déjà." },
                { status: 400 }
            );
        }

        // Hash du mot de passe avant stockage dans la base.
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // Création de l'utilisateur
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({
            message: "Inscription réussie !",
            user: { id: user.id, email: user.email },
        });
    } catch (error) {
        console.error("Erreur d'inscription :", error);
        return NextResponse.json(
            { error: "Une erreur est survenue lors de l'inscription." },
            { status: 500 }
        );
    }
}