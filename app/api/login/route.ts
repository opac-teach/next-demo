import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD 
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET); 

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
 
        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: "Identifiants invalides" },
                { status: 401 }
            );
        }
 
        const token = await new SignJWT({ email, role: "user" })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d") 
            .sign(JWT_SECRET);
 
        const cookieStore = await cookies();
        cookieStore.set({
            name: "auth_token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, 
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