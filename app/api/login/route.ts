import { cookies } from 'next/headers'
 
export async function login(request: Request) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const token = await createJWT({ userId, expiresAt })
  const cookieStore = await cookies()
 
  cookieStore.set('access_token', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}