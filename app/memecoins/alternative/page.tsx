'use client';

import Link from 'next/link';

export default function NavigationPage() {
    const links = [
        { href: '/memecoins/alternative/streaming', label: 'Streaming' },
        { href: '/memecoins/alternative/isr', label: 'Incremental Static Regeneration (ISR)' },
        { href: '/memecoins/alternative/csr', label: 'Client-Side Rendering (CSR)' },
        { href: '/memecoins/alternative/rsc', label: 'React Server Components (RSC)' },
        { href: '/memecoins/alternative/ssg', label: 'Static Site Generation (SSG)' },
        { href: '/memecoins/alternative/storage', label: 'LocalStorage' }
    ];

    return (
        <div className="container mx-auto p-4 relative">
            <div className="absolute top-4 right-4 flex space-x-2">
                <Link href="/memecoins" passHref>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Retour
                    </button>
                </Link>
            </div>
            <h1 className="text-2xl font-bold mb-4">Navigation vers les différentes pages :</h1>
            <ul className="list-disc pl-5 space-y-2">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link href={link.href} className="text-blue-500 hover:underline">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}