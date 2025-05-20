import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Extraire le chemin demandé
    const { pathname } = request.nextUrl;

    // Récupérer le cookie d'authentification (auth_token)
    const authCookie = request.cookies.get('auth_token');
    const isLoggedIn = !!authCookie;

    console.log('Pathname:', pathname); // Pour déboguer
    console.log('Is logged in:', isLoggedIn);

    // Liste des chemins protégés où l'utilisateur doit être connecté
    const protectedPaths = ['/memecoins'];

    // Si non connecté et accède à une page protégée
    if (!isLoggedIn && protectedPaths.some((path) => pathname.startsWith(path))) {
        console.log('Redirection vers /login car utilisateur non connecté.');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Si déjà connecté et accède à /login, on le redirige ailleurs
    if (isLoggedIn && pathname === '/login') {
        console.log('Redirection vers / car utilisateur déjà connecté.');
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Par défaut, poursuivre la requête
    console.log('Autorisation accordée. Pas de redirection.');
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/login',
        '/memecoins/:path*',   // Protège toutes les sous-routes de /memecoins
    ],
};