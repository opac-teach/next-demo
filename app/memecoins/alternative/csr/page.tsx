'use client';

import MemecoinCSR from '@/components/memecoins/alternative/CSR/MemecoinCSR';

export default function MemecoinCSRPage() {

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Client-Side Rendering</h1>
            <MemecoinCSR />
        </div>
    );
}