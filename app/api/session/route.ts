import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value;

	if (!token) {
		return NextResponse.json({ authenticated: false });
	}

	try {
		await jwtVerify(token, JWT_SECRET);
		return NextResponse.json({ authenticated: true });
	} catch {
		return NextResponse.json({ authenticated: false });
	}
}
