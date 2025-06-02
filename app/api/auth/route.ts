import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export async function GET(request: NextRequest) {
    try {
        // Lire le cookie auth_token
        const token = request.cookies.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json({ isLoggedIn: false }, { status: 401 });
        }

        // Vérifier le JWT et récupérer les données du payload
        if (!SECRET_KEY) {
            throw new Error("JWT_SECRET n'est pas défini");
        }

        const decoded = jwt.verify(token, SECRET_KEY) as { userId: string }; // Décoder le token
        const userId = decoded.userId; // Extraire l'ID utilisateur

        // Si le token est valide, retourner l'ID utilisateur
        return NextResponse.json({ isLoggedIn: true, userId });
    } catch {
        // Si une erreur s'est produite ou le token est invalide
        return NextResponse.json({ isLoggedIn: false }, { status: 401 });
    }
}