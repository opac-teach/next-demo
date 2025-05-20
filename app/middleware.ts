import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode('your-jwt-secret-key');

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === '/login' || path.startsWith('/_next/') || path === '/favicon.ico') {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth-token')?.value;

  let isAuthenticated = false;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      isAuthenticated = !!payload.user;
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
    }
  }

  if (!isAuthenticated) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && path === '/login') {
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
