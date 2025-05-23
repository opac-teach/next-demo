import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;
const PASSWORD = process.env.MDP_LOGIN;

interface LoginRequestBody {
    password: string;
}

// Fonction appelée lorsque la requête POST est envoyée à /api/login
export async function POST(request: Request) {
    try {
        // Récupérer et parser le corps de la requête
        const body: LoginRequestBody = await request.json();

        // Vérification du mot de passe
        if (body.password === PASSWORD) {
            // Générer un token JWT avec une durée de validité de 1 heure
            if (!SECRET_KEY) {
                throw new Error("JWT_SECRET environment variable is not defined");
            }
            const token = jwt.sign({ loggedIn: true }, SECRET_KEY, { expiresIn: "1h" });

            // Créer la réponse et injecter le cookie sécurisé
            const response = NextResponse.json({ message: "Authentification réussie" });
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            response.cookies.set("auth_token", token, {
                httpOnly: true,
                secure: true,
                expires: expiresAt,
                sameSite: 'lax',
                path: '/',
            });
            return response;
        }

        // Mot de passe incorrect
        return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    } catch  {
        // Si une erreur survient lors du traitement
        return NextResponse.json(
            { error: "Erreur inattendue. Veuillez réessayer." },
            { status: 500 }
        );
    }
}