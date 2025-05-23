'use client';

import MemecoinCSR from '@/components/memecoins/alternative/CSR/MemecoinCSR';
import Link from "next/link";

export default function MemecoinCSRPage() {

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-end mb-4">
                <Link href="/memecoins/alternative" passHref>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Retour
                    </button>
                </Link>
            </div>

            <h1 className="text-2xl font-bold mb-4">Client-Side Rendering</h1>
            <MemecoinCSR />
        </div>
    );
}