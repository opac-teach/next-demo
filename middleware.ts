import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Secret pour vérifier le JWT (doit être identique à celui utilisé dans route.ts)
const JWT_SECRET = new TextEncoder().encode("your_jwt_secret_key");

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Récupérer le token depuis le cookie
    const token = request.cookies.get("auth_token")?.value;

    // Si aucun token n'est trouvé, rediriger vers la page de connexion
    if (!token) {
        const url = new URL("/login", request.url);
        url.searchParams.set("from", pathname);
        return NextResponse.redirect(url);
    }

    try {
        // Vérifier et décoder le token JWT avec jose
        await jwtVerify(token, JWT_SECRET);
        
        // Token valide, autoriser l'accès
        return NextResponse.next();
    } catch (error) {
        // Token invalide ou expiré
        console.error("Erreur de vérification du token:", error);

        // Rediriger vers la page de connexion
        const url = new URL("/login", request.url);
        url.searchParams.set("from", pathname);
        return NextResponse.redirect(url);
    }
}

// Configurer les chemins sur lesquels le middleware doit s'exécuter
export const config = {
    matcher: ["/posts/:path*", "/memecoins/:path*"],
};