import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const body = await req.json();

	// Basic validation (you should reuse your client schema ideally)
	if (
		typeof body.name !== 'string' ||
		body.name.length < 4 ||
		body.name.length > 16 ||
		typeof body.symbol !== 'string' ||
		!/^[A-Z]{2,4}$/.test(body.symbol)
	) {
		return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
	}

	try {
		const newCoin = await prisma.memecoin.create({
			data: {
				name: body.name,
				symbol: body.symbol,
				description: body.description || null,
				logoUrl: body.logoUrl || null,
			},
		});

		return NextResponse.json(newCoin);
	} catch (e) {
		void e;
		return NextResponse.json({ error: 'Error creating memecoin' }, { status: 500 });
	}
}
