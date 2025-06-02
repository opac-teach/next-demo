import { Suspense } from 'react';
import { Memecoin } from '@/lib/types';
import MemecoinItem from './MemecoinItem';

// Loading placeholder for the list
function MemecoinListSkeleton() {
	return (
		<ul>
			{[...Array(5)].map((_, i) => (
				<li key={i} className="border rounded p-4 flex gap-4 bg-white/80 animate-pulse">
					<div className="w-16 h-16 bg-gray-300 rounded-full"></div>
					<div className="flex-grow">
						<div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
						<div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
						<div className="h-4 bg-gray-300 rounded w-1/5 mb-2"></div>
						<div className="h-3 bg-gray-300 rounded w-2/3"></div>
					</div>
				</li>
			))}
		</ul>
	);
}

export default function MemecoinList({ memecoins }: { memecoins: Memecoin[] }) {
	if (!memecoins.length) {
		return <p className="text-gray-500 italic">No memecoins available yet.</p>;
	}

	return (
		<ul className="m-0 p-0 list-none">
			{memecoins.map((coin) => (
				<MemecoinItem key={coin.id} memecoin={coin} />
			))}
		</ul>
	);
}

// This component handles fetching the data and rendering with Suspense
export function MemecoinListWithSuspense() {
	return (
		<Suspense fallback={<MemecoinListSkeleton />}>
			<MemecoinListFetcher />
		</Suspense>
	);
}

// This component is responsible for fetching the data
async function MemecoinListFetcher() {
	const memecoins = await fetchMemecoins();
	return <MemecoinList memecoins={memecoins} />;
}
// Data fetching function
async function fetchMemecoins(): Promise<Memecoin[]> {
	const res = await fetch("http://localhost:3000/api/get-memecoins", {
		cache: "no-store", // Use no-store to always fetch fresh data
		next: { tags: ['memecoins'] } // Tag for revalidation
	});

	if (!res.ok) throw new Error("Failed to fetch memecoins");
	return res.json();
}