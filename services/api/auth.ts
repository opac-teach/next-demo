import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables")
}

export async function isAuth() {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    const isValid = token && (await verifyJWT(token))
    if (isValid) {
      return true
    } 
    else {
      return false
    }
}

export async function createJWT(payload: Record<string, unknown>){
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

export async function verifyJWT (token: string ) {
  try {
    return await jwtVerify(token, JWT_SECRET);
  } 
  catch {
    return null;
  }
}
