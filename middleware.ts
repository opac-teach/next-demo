import { verifyJWT } from '@/services/api/auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

 
export async function middleware(req: NextRequest) {

    const url = req.nextUrl.clone();
    const { pathname } = url;
    const publicRoutes = ["/","/login","/demos","/posts"];
    // const privateRoutes = ["/memecoins"];

    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    const isValid = token && (await verifyJWT(token));

    if (!isValid) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};