import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(process.env.JWT_TOKEN!)
if (!secret) {
    throw new Error("JWT_TOKEN is not defined")
}

export async function createJWT({
  userId,
  expiresAt,
}: {
  userId: string
  expiresAt: Date
}) {
  const alg = 'HS256'

  const jwt = await new SignJWT({ userId })
    .setProtectedHeader({ alg })
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000)) // in seconds
    .setIssuedAt()
    .sign(secret)

  return jwt
}

export async function checkAuthentication() {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value

    if (access_token && await verifyJWT(access_token)) {
        return true;
    } else {
        return false
    }
}

export async function verifyJWT (token: string ) {
  try {
    return await jwtVerify(token, secret);
  } 
  catch {
    return null;
  }
}