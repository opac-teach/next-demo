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

        // Vérifier le JWT
        if (!SECRET_KEY) {
            throw new Error("JWT_SECRET n'est pas défini");
        }
        jwt.verify(token, SECRET_KEY);

        // Si le token est valide
        return NextResponse.json({ isLoggedIn: true });
    } catch  {
        // Si une erreur s'est produite ou le token est invalide
        return NextResponse.json({ isLoggedIn: false }, { status: 401 });
    }
}