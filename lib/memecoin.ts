import { Memecoin } from "@/types/memecoin";

export async function fetchMemecoins(): Promise<Memecoin[]> {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins');
    if (!res.ok) {
        throw new Error(res.statusText || 'Failed to fetch memecoins');
    }
    return await res.json();
}

export async function fetchMemecoin(id: string): Promise<Memecoin> {
    const response = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins/' + id);
    return response.json();
}
