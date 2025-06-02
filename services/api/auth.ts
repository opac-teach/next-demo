import { jwtVerify,SignJWT } from 'jose';
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);


export async function isValid(){
    
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    const isValid = token && (await verifyToken(token));

    return isValid ? true : false
}

export async function verifyToken(token: string) {
  try {
    return await jwtVerify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function createJWT(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}