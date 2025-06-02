import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { Memecoin } from '@/lib/types';

export async function generateMetadata(
	{ params }: { params: { id: string } }
): Promise<Metadata> {
	try {
		const memecoin = await fetchMemecoin(params.id);

		return {
			title: `${memecoin.name} (${memecoin.symbol}) - Memecoin Details`,
			description: memecoin.description || `Details about ${memecoin.name} memecoin`,
			openGraph: {
				title: `${memecoin.name} (${memecoin.symbol})`,
				description: memecoin.description || `Details about ${memecoin.name} memecoin`,
				images: memecoin.logoUrl ? [memecoin.logoUrl] : [],
			},
		};
	} catch (error) {
		console.log(error)
		return {
			title: 'Memecoin Details',
			description: 'Information about this memecoin',
		};
	}
}

function MemecoinDetailsSkeleton() {
	return (
		<div className="animate-pulse p-8">
			<div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
			<div className="flex gap-8">
				<div className="w-32 h-32 bg-gray-300 rounded-full"></div>
				<div className="flex-grow">
					<div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
					<div className="h-5 bg-gray-200 rounded w-1/6 mb-4"></div>
					<div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
					<div className="h-32 bg-gray-200 rounded w-full"></div>
				</div>
			</div>
		</div>
	);
}

async function fetchMemecoin(id: string): Promise<Memecoin> {
	const res = await fetch(`http://localhost:3000/api/get-memecoins/${id}`, {
		cache: "no-store",
	});

	if (!res.ok) {
		if (res.status === 404) {
			throw new Error("Memecoin not found");
		}
		throw new Error("Failed to fetch memecoin details");
	}

	return res.json();
}

async function MemecoinDetails({ id }: { id: string }) {
	let memecoin: Memecoin;

	try {
		memecoin = await fetchMemecoin(id);
	} catch (error) {
		if ((error as Error).message === "Memecoin not found") {
			notFound();
		}
		throw error;
	}

	return (
		<div className="bg-white p-8 rounded-lg shadow-md">
			<div className="flex flex-col md:flex-row gap-8 items-start">
				<div className="flex-shrink-0">
					{memecoin.logoUrl ? (
						<img
							src={memecoin.logoUrl}
							alt={memecoin.name}
							width={128}
							height={128}
							className="rounded-full shadow-sm"
						/>
					) : (
						<div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center shadow-sm">
							<span className="text-4xl font-bold text-gray-500">{memecoin.symbol.charAt(0)}</span>
						</div>
					)}
				</div>

				<div className="flex-grow">
					<div className="flex justify-between items-start mb-4">
						<div>
							<h1 className="text-3xl font-bold">{memecoin.name}</h1>
							<h2 className="text-xl text-gray-600 font-semibold">{memecoin.symbol}</h2>
						</div>
						{memecoin.price !== undefined && (
							<div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-lg font-semibold">
								${memecoin.price.toFixed(6)}
							</div>
						)}
					</div>

					{memecoin.description ? (
						<div className="mt-6">
							<h3 className="text-lg font-semibold mb-2">Description</h3>
							<p className="text-gray-700 whitespace-pre-line">{memecoin.description}</p>
						</div>
					) : (
						<p className="text-gray-500 italic mt-6">No description available.</p>
					)}

					{memecoin.createdAt && (
						<div className="mt-8 text-sm text-gray-500">
							Added on {new Date(memecoin.createdAt).toLocaleDateString()} at {new Date(memecoin.createdAt).toLocaleTimeString()}
						</div>
					)}
				</div>
			</div>

			<div className="mt-10 pt-4 border-t">
				<Link href="/memecoins" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
					Back to Memecoins
				</Link>
			</div>
		</div>
	);
}

export default function MemecoinDetailsPage({ params }: { params: { id: string } }) {
	return (
		<div className="container mx-auto px-4 py-8">
			<Suspense fallback={<MemecoinDetailsSkeleton />}>
				<MemecoinDetails id={params.id} />
			</Suspense>
		</div>
	);
}