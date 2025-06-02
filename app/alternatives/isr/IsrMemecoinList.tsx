import { Memecoin } from '@/lib/types';
import MemecoinList from '@/components/memecoins/MemecoinList';

export const revalidate = 30;

export default async function IsrMemecoinList() {
	const res = await fetch('/api/get-memecoins', {
		next: { revalidate: 30 }
	});
	const memecoins: Memecoin[] = await res.json();

	return <MemecoinList memecoins={memecoins} />;
}