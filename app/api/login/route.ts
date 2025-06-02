import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const TOKEN_DURATION = 60 * 60 * 24;

export async function POST(req: NextRequest) {
	const {email, password} = await req.json();
	const user = await prisma.user.findUnique({
		where: { email }
	});

	if (!user || !(await compare(password, user.password))) {
		return NextResponse.json(
			{
				error: 'Invalid email or password'
			},
			{
				status: 401
			}
		);
	}

	const token = await new SignJWT({ role: 'user' , email})
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(`${TOKEN_DURATION}s`)
		.sign(JWT_SECRET);

	const cookieStore = await cookies();
	cookieStore.set('token', token, {
		httpOnly: true,
		secure: true,
		path: '/',
		maxAge: TOKEN_DURATION,
	});

	return NextResponse.json({ success: true });
}
