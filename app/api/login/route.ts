import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY: string = "votreclésecrète"; // Remplacez par une clé secrète robuste
const PASSWORD: string = "mdp"; // Mot de passe défini pour l'authentification

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
            const token = jwt.sign({ loggedIn: true }, SECRET_KEY, { expiresIn: "1h" });

            // Créer la réponse et injecter le cookie sécurisé
            const response = NextResponse.json({ message: "Authentification réussie" });
            response.cookies.set("auth_token", token, {
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 3600, // Durée de 1 heure
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