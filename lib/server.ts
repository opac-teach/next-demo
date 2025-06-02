import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET = 'd7bef0bfae1f4561b272157760364cce845dc880ceba5e2f256979a6accccd41'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('token')?.value
  let authenticated = false

  if (token) {
    try {
      jwt.verify(token, SECRET)
      authenticated = true
    } catch {}
  }

  const isLoginPage    = pathname === '/login'
  const isMemecoinsURI = pathname.startsWith('/memecoins')

  if (!authenticated && isMemecoinsURI) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  if (authenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/memecoins', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/memecoins/:path*', '/login'],
}
