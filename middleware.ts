
import { NextRequest, NextResponse } from 'next/server';
import { isValid } from './services/api/auth';

 
export async function middleware(req: NextRequest) {

    const url = req.nextUrl.clone();
    const { pathname } = url;
    const publicRoutes = ["/","/login","/demos","/posts"];
    // const privateRoutes = ["/memecoins"];
    
    const isLogged = await isValid();

    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    if (!isLogged) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
