import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  const { email, password, username } = await request.json();

  if (!email || !password || !username) {
    return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
  }

  const existingEmail = await prisma.user.findUnique({ where: { email } });
  const existingUsername = await prisma.user.findUnique({ where: { username } });

  if (existingEmail) {
    return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 409 });
  }

  if (existingUsername) {
    return NextResponse.json({ error: 'Ce nom d\'utilisateur est déjà pris' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    message: 'Utilisateur créé avec succès',
    user: { id: user.id, email: user.email, username: user.username },
  });
}