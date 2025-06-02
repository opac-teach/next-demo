'use client';

import dynamic from 'next/dynamic';

const CsrMemecoinList = dynamic(() => import('./CsrMemecoinList'), {
	ssr: false,
	loading: () => <p>Loading CSR list...</p>
});

export default function CsrMemecoinListWrapper() {
	return <CsrMemecoinList />;
}
