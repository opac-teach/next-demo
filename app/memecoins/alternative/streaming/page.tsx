import { Suspense } from "react";
import MemecoinStreamingCSR from "@/components/memecoins/alternative/Streaming/MemecoinStreamingCSR";
import { Memecoin } from "@/components/types/memecoin";

async function fetchMemecoin() {
    const response = await fetch("https://nuxt-demo-blush.vercel.app/api/get-memecoins");
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données des memecoins");
    }

    const data: Memecoin[] = await response.json();
    // Retourne le premier memecoin pour cet exemple
    return data;
}

export default async function Page() {
    const memecoinPromise = fetchMemecoin();

    return (
        <Suspense fallback={<div>Chargement du memecoin...</div>}>
            <MemecoinStreamingCSR memecoinPromise={memecoinPromise} />
        </Suspense>
    );
}