import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function isAuthenticated(): Promise<boolean> {
	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value;

	if (!token) return false;

	try {
		await jwtVerify(token, JWT_SECRET);
		return true;
	} catch {
		return false;
	}
}
