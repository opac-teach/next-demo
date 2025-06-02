import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const PASSWORD = 'password'
const JWT_SECRET = 'un_secret_fort'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (password !== PASSWORD) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }
  const token = jwt.sign({ user: 'admin' }, JWT_SECRET, { expiresIn: '7d' })
  const res = NextResponse.json({ success: true })
  res.cookies.set('token', token, { httpOnly: true, path: '/', sameSite: 'lax' })
  return res
}