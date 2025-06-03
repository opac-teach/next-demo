import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function isAuthenticated() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('auth-token');

  if (!token || !token.value) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(token.value, JWT_SECRET);
    return !!payload.userId;
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    return false;
  }
}

export async function getAuthenticatedUser() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('auth-token');

  if (!token || !token.value) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token.value, JWT_SECRET);
    const userId = payload.userId;

    if (!userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        id: true,
        username: true,
        balance: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    return null;
  }
}

export async function logout() {
  'use server';
  (await cookies()).delete('auth-token');
}