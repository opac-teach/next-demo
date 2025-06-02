import { cookies } from 'next/headers'
import { createJWT } from '@/app/service/api/auth'
import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

export async function POST(req: Request) {
  const {user, password} = await req.json() as {
    user: string,
    password: string
  }

  if (!(user === process.env.USER && password === process.env.PASSWORD)) {
    return NextResponse.json({error: "Invalid credentials"}, {status: 401});
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const token = await createJWT({userId: nanoid(), expiresAt: expiresAt})

  const cookieStore = await cookies();


  
  cookieStore.set({
    name: 'access_token',
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  cookieStore.set({
    name: 'user_token',
    value: user,
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true})
}

