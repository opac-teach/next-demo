import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode('your-jwt-secret-key');

export async function isAuthenticated() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('auth-token');

  if (!token || !token.value) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(token.value, JWT_SECRET);
    return !!payload.user;
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    return false;
  }
}

export async function logout() {
  'use server';
  (await cookies()).delete('auth-token');
}