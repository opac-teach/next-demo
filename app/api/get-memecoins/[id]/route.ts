import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const memecoin = await prisma.memecoin.findUnique({
			where: { id: params.id },
		});

		if (!memecoin) {
			return NextResponse.json({ error: 'Not found' }, { status: 404 });
		}

		return NextResponse.json(memecoin);
	} catch {
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
