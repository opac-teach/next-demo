import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const memecoins = await prisma.memecoin.findMany({
			orderBy: { createdAt: 'desc' },
		});
		return NextResponse.json(memecoins);
	} catch {
		return NextResponse.json({ error: 'Failed to fetch memecoins' }, { status: 500 });
	}
}
