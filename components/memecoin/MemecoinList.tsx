'use client';

import NotificationError from "@/components/notification/NotificationError";
import { fetchMemecoins } from '@/lib/memecoin';
import { MemecoinType } from "@/types/memecoin";
import { useEffect, useState } from 'react';
import MemecoinCard from "./MemecoinCard";

export default function MemecoinList() {
    const [memecoins, setMemecoins] = useState<MemecoinType[]>([]);
    const [error, setError] = useState<string | null>(null);

    async function refreshMemecoin() {
        try {
            const data = await fetchMemecoins();
            setMemecoins(data);
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
            {error && <NotificationError error={error} />}
            {memecoins.map((memecoin) => (
                <MemecoinCard key={memecoin.id} memecoin={memecoin} />
            ))}
        </>
    );
}
