import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const PASSWORD   = 'root'
const JWT_SECRET = 'd7bef0bfae1f4561b272157760364cce845dc880ceba5e2f256979a6accccd41'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    if (password !== PASSWORD) {
      return NextResponse.json({ error: 'Mot de passe invalide' }, { status: 401 })
    }

    const token = jwt.sign({}, JWT_SECRET, { expiresIn: '1h' })
    const res   = NextResponse.json({ success: true })

    res.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  }
}