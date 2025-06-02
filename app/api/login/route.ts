import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import { nanoid } from 'nanoid'
import { createJWT } from '@/services/api/auth'

export async function POST(req: Request) {
  const { pseudo, password } = await req.json() as {
    pseudo: string;
    password: string;
  }

  const isValid = pseudo === process.env.PSEUDO && password === process.env.PASSWORD

  if(!isValid) {
    return NextResponse.json({error: "identifiants invalides"}, {status: 401});
  }

  const token = await createJWT({sub: nanoid(), pseudo})

  const cookieStore = await cookies()

  cookieStore.set({
    name: 'access_token',
    value: token,
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set({
    name: 'user_token',
    value: pseudo,
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true})
}