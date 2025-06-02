'use server';

import { CreateMemecoinPayload } from '@/lib/types';
import { revalidateTag } from 'next/cache';

export async function createMemecoinAction(payload: CreateMemecoinPayload) {
	const res = await fetch('http://localhost:3000/api/create-memecoin', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.error || 'Failed to create memecoin');
	}

	revalidateTag('memecoins');
	return { success: true, message: 'Memecoin created successfully!' };
}
