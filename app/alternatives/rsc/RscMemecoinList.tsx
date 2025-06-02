import { Memecoin } from '@/lib/types';
import MemecoinList from '@/components/memecoins/MemecoinList';

export default async function RscMemecoinList() {
	try {
		const res = await fetch('/api/get-memecoins', {
			cache: 'no-store'
		});
		if (!res.ok) throw new Error('Failed to fetch');

		const memecoins: Memecoin[] = await res.json();
		return <MemecoinList memecoins={memecoins} />;
	} catch (error) {
		console.error('RSC fetch error:', error);
		return <p className="text-red-600">Failed to load memecoins.</p>;
	}
}
