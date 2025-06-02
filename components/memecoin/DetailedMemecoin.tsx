'use client'

import NotificationError from "@/components/notification/NotificationError";
import { fetchMemecoin } from "@/lib/memecoin";
import { MemecoinType } from '@/types/memecoin';
import { useEffect, useState } from "react";

export default function DetailedMemecoin({ id }: { id: string }) {
    const [memecoin, setMemecoin] = useState<MemecoinType | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function refreshMemecoin() {
        try {
            const data = await fetchMemecoin(id);
            setMemecoin(data);
            setError(null);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    useEffect(() => {
        refreshMemecoin();

        const interval = setInterval(async () => {
            refreshMemecoin();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {error && <NotificationError title="Erreur" message={error} />}
            {memecoin &&
                <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
                    <div className="flex items-center space-x-4">
                        <img src={memecoin.logoUrl} alt={`${memecoin.name} logo`} className="w-16 h-16 object-contain" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {memecoin.name} <span className="text-gray-500">({memecoin.symbol})</span>
                            </h2>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-700">{memecoin.description}</p>
                    <p className="mt-2 text-sm text-gray-500">Owner: {memecoin.owner}</p>
                </div>
            }
        </>
    );
}
