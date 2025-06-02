import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const TOKEN_DURATION = 60 * 60 * 24;

export async function POST(req: NextRequest) {
	const body = await req.json();

	if (body.password !== PASSWORD) {
		return NextResponse.json(
			{
				error: 'Invalid password'
			},
			{
				status: 401
			}
		);
	}

	const token = await new SignJWT({ role: 'user' })
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
