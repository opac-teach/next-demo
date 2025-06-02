import { Suspense } from 'react';
import RscMemecoinList from './rsc/RscMemecoinList';
import StreamingMemcoinList from './streaming/StreamingMemecoinList';
import SsgMemecoinList from './ssg/SsgMemecoinList';
import IsrMemecoinList from './isr/IsrMemecoinList';
import CsrMemecoinList from './csr/CsrMemecoinListWrapper';

const Wrapper = ({ title, children }: { title: string; children: React.ReactNode }) => (
	<div className="p-4 border rounded-lg bg-white shadow space-y-2">
		<h2 className="text-xl font-semibold">{title}</h2>
		{children}
	</div>
);

export default function AlternativesPage() {
	return (
		<div className="container mx-auto p-8 space-y-8">
			<h1 className="text-3xl font-bold">Rendering Strategies – MemecoinList</h1>

			<div className="grid md:grid-cols-2 gap-6">
				<Wrapper title="RSC – Server Component">
					<RscMemecoinList />
				</Wrapper>

				<Wrapper title="Streaming (Suspense)">
					<Suspense fallback={<p>Loading via Suspense…</p>}>
						<StreamingMemcoinList />
					</Suspense>
				</Wrapper>

				<Wrapper title="SSG – Static Site Generation">
					<SsgMemecoinList />
				</Wrapper>

				<Wrapper title="ISR – Incremental Static Regeneration (30s)">
					<IsrMemecoinList />
				</Wrapper>

				<Wrapper title="CSR – Client Side Rendering">
					<CsrMemecoinList />
				</Wrapper>
			</div>
		</div>
	);
}
