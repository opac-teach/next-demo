'use client';

import { useEffect, useState } from 'react';
import { Memecoin } from '@/lib/types';
import MemecoinList from '@/components/memecoins/MemecoinList';

export default function CsrMemecoinList() {
	const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('/api/get-memecoins')
			.then((res) => res.json())
			.then(setMemecoins)
			.catch(console.error)
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <p>Loading CSR data…</p>;
	return <MemecoinList memecoins={memecoins} />;
}