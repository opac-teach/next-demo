import { Suspense } from 'react';
import MemecoinItem from '../../app/memecoins/MemecoinItem';
import { revalidatePath } from 'next/cache';

interface Memecoin {
	id: string;
	name: string;
	symbol: string;
	description?: string;
	logoUrl?: string;
}

async function getMemecoins(): Promise<Memecoin[]> {
	try {
		await new Promise(resolve => setTimeout(resolve, 2000));

		const response = await fetch('http://localhost:3000/api/get-memecoins', {
			cache: 'no-store'
		});

		if (!response.ok) {
			throw new Error(`Erreur lors de la récupération des memecoins: ${response.status}`);
		}

		const data = await response.json();

		if (!Array.isArray(data)) {
			console.error('Réponse API incorrecte: les données ne sont pas un tableau');
			return [];
		}

		return data.filter(item =>
			item &&
			typeof item === 'object' &&
			'id' in item &&
			'name' in item &&
			'symbol' in item
		);
	} catch (error) {
		console.error('Erreur lors de la récupération des memecoins:', error);
		return [];
	}
}

async function MemecoinsContent() {
	const memecoins = await getMemecoins();

	return (
		<>
			<h2 className="text-xl font-bold mb-4">{memecoins.length} memecoins trouvés (Streaming)</h2>

			{memecoins.length === 0 ? (
				<p className="text-gray-500 text-center py-4">
					Aucun memecoin trouvé
				</p>
			) : (
				<ul className="space-y-4">
					{memecoins.map((memecoin) => (
						<MemecoinItem key={memecoin.id} memecoin={memecoin} />
					))}
				</ul>
			)}
		</>
	);
}

function LoadingFallback() {
	return (
		<div className="py-8">
			<h2 className="text-xl font-bold mb-4">Chargement des memecoins...</h2>
			<div className="flex items-center justify-center">
				<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
			</div>
		</div>
	);
}

export default function MemecoinListStreaming() {
	async function refreshMemecoins() {
		'use server';
		revalidatePath('/memecoins');
	}

	return (
		<div className="bg-white shadow-md rounded-lg p-6">
			<div className="mb-6">
				<div className="text-sm text-gray-500 mb-4">
					Cette liste utilise le streaming - le contenu s'affichera progressivement
				</div>
				<form action={refreshMemecoins}>
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
					>
						Rafraîchir
					</button>
				</form>
			</div>

			<Suspense fallback={<LoadingFallback />}>
				<MemecoinsContent />
			</Suspense>
		</div>
	);
}