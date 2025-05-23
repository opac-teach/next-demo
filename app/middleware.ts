import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET ?? 'very-secret';
const PROTECTED = ['/memecoins/create'];

async function isAuthenticated(token: string | undefined) {
  if (!token) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;
  const logged = await isAuthenticated(token);

  if (pathname.startsWith('/login') && logged) {
    return NextResponse.redirect(new URL('/memecoins', req.url));
  }

  if (!logged && PROTECTED.some(p => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
