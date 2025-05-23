import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

// Configuration de l'authentification
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // À changer pour un mot de passe plus sécurisé en production
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET); // À définir en variable d'environnement en production

export async function POST(request: NextRequest) {
    try {
        // Récupérer les données de la requête
        const { email, password } = await request.json();

        // Vérifier les identifiants
        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: "Identifiants invalides" },
                { status: 401 }
            );
        }

        // Créer le token JWT avec jose
        const token = await new SignJWT({ email, role: "user" })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d") // Token valide pour 7 jours
            .sign(JWT_SECRET);

        // Configurer le cookie
        const cookieStore = await cookies();
        cookieStore.set({
            name: "auth_token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 7 jours en secondes
            path: "/",
        });

        return NextResponse.json(
            {
                success: true,
                user: { email, role: "user" },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        return NextResponse.json(
            { error: "Une erreur est survenue lors de la connexion" },
            { status: 500 }
        );
    }
}
