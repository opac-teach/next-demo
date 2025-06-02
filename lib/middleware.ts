import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
	const token = request.cookies.get('token')?.value;
	const pathName = request.nextUrl.pathname;
	const isLoginPage = pathName === '/login';
	const isProtected = pathName.startsWith('/memecoins');

	if (!token) {
		// Not logged in → block protected pages
		if (isProtected && request.method === 'GET') {
			return NextResponse.redirect(new URL('/login', request.url));
		}
	} else {
		// Logged in → prevent access to /login
		try {
			await jwtVerify(token, JWT_SECRET);
			if (isLoginPage) {
				return NextResponse.redirect(new URL('/memecoins', request.url));
			}
		} catch {
			// Invalid token → clear and redirect
			const res = NextResponse.redirect(new URL('/login', request.url));
			res.cookies.delete('token');
			return res;
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/login', '/memecoins/:path*'],
};
