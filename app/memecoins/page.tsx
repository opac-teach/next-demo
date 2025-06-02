'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Memecoin } from '@/lib/types';
import MemecoinList from '@/components/memecoins/MemecoinList';
import CreateMemecoinForm from '@/components/memecoins/CreateMemecoinForm';
import { useAuth } from '../../lib/hooks/useAuth';

function ErrorDisplay() {
	return (
		<div className="p-8 bg-red-50 rounded-lg border border-red-200 text-red-700">
			<h3 className="text-lg font-semibold mb-2">Error Loading Memecoins</h3>
			<p>We could not load the memecoin data. Please try again later.</p>
		</div>
	);
}

function LoadingMemecoins() {
	return (
		<div className="p-8 animate-pulse">
			<div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
			<div className="space-y-4">
				{[...Array(5)].map((_, i) => (
					<div key={i} className="border rounded p-4 flex gap-4 bg-white/80">
						<div className="w-16 h-16 bg-gray-300 rounded-full"></div>
						<div className="flex-grow">
							<div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
							<div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
							<div className="h-4 bg-gray-300 rounded w-1/5 mb-2"></div>
							<div className="h-3 bg-gray-300 rounded w-2/3"></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

async function fetchMemecoins(): Promise<Memecoin[]> {
	const res = await fetch('http://localhost:3000/api/get-memecoins', {
		cache: 'no-store',
	});

	if (!res.ok) throw new Error('Failed to fetch memecoins');
	return res.json();
}

export default function MemecoinPage() {
	const { isAuthenticated } = useAuth();
	const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [refreshKey, setRefreshKey] = useState(0);

	useEffect(() => {
		const loadMemecoins = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await fetchMemecoins();
				setMemecoins(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to load memecoins');
			} finally {
				setLoading(false);
			}
		};
				const interval = setInterval(() => {
			setRefreshKey((prevKey) => prevKey + 1);
		}, 30000);

		loadMemecoins();
		return () => clearInterval(interval);
	}, [refreshKey]);

	const handleMemecoinCreated = () => {
		setRefreshKey((prevKey) => prevKey + 1);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Memecoins</h1>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<section className="mb-10">
						<div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg shadow">
							{error ? (
								<ErrorDisplay />
							) : loading ? (
								<LoadingMemecoins />
							) : (
								<MemecoinList memecoins={memecoins} />
							)}
						</div>
					</section>
				</div>
				<div>
					<section>
						{isAuthenticated === null ? (
							<p className="italic text-gray-500">Checking authentication...</p>
						) : isAuthenticated ? (
							<CreateMemecoinForm onSuccess={handleMemecoinCreated} />
						) : (
							<div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
								<p className="mb-2">You must be logged in to create a memecoin.</p>
								<Link href="/login" className="underline text-blue-600 hover:text-blue-800">
									Login
								</Link>
							</div>
						)}
					</section>
				</div>
			</div>
		</div>
	);
}
