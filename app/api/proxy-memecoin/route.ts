import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const res = await fetch('/api/get-memecoins');
		const data = await res.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Proxy error:', error);
		return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
	}
}
