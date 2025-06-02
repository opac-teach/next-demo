'use client';

import { useEffect, useState } from 'react';
import { Memecoin } from '@/lib/types';

export function useMemecoins(pollInterval = 30000) {
	const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchMemecoins = async () => {
		try {
			setLoading(true);
			const res = await fetch('/api/get-memecoins', {
				cache: 'no-store',
			});
			if (!res.ok) throw new Error('Failed to fetch memecoins');
			const data = await res.json();
			setMemecoins(data);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Unknown error');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMemecoins(); // initial load
		const interval = setInterval(fetchMemecoins, pollInterval);
		return () => clearInterval(interval);
	}, [pollInterval]);

	return { memecoins, loading, error, refetch: fetchMemecoins };
}
