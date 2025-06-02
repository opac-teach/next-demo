import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// Secret pour vérifier le JWT
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json({
                isAuthenticated: false
            });
        }

        // Vérifier la validité du token
        const { payload } = await jwtVerify(token, JWT_SECRET);

        return NextResponse.json({
            isAuthenticated: true,
            user: payload
        });
    } catch (error) {
        return NextResponse.json({
            isAuthenticated: false,
            error: error
        });
    }
}