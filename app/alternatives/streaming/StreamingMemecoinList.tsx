'use client';

import { Suspense } from 'react';
import { MemecoinListWithSuspense } from '@/components/memecoins/MemecoinList';

export default function StreamingMemcoinList() {
	return (
		<Suspense fallback={<p>Loading via Suspense…</p>}>
			<MemecoinListWithSuspense />
		</Suspense>
	);
}