import { Memecoin } from '@/lib/types';
import MemecoinList from '@/components/memecoins/MemecoinList';

export const dynamic = 'force-static';

export default async function SsgMemecoinList() {
	const res = await fetch('/api/get-memecoins', {
		cache: 'force-cache'
	});
	const memecoins: Memecoin[] = await res.json();

	return <MemecoinList memecoins={memecoins} />;
}