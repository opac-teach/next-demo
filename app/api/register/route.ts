import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
	const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,30}$/;
	return passwordRegex.test(password);
};

export async function POST(req: NextRequest) {
	const { email, password } = await req.json();

	if (!isValidEmail(email)) {
		return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
	}

	if (!isValidPassword(password)) {
		return NextResponse.json({
			error: 'Password must be 8–30 characters, include an uppercase letter and a number',
		}, { status: 400 });
	}


	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) {
		return NextResponse.json({ error: 'User already exists' }, { status: 409 });
	}

	const hashedPassword = await hash(password, 10);

	const user = await prisma.user.create({
		data: { email, password: hashedPassword },
	});

	return NextResponse.json({ message: 'User registered', userId: user.id });
}
