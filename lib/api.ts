export type Memecoin = {
  id: string;
  name: string;
  symbol: string;
  description?: string;
  logoUrl?: string;
};

const MEME_URL = 'https://nuxt-demo-blush.vercel.app/api';

export async function fetchMemecoins(): Promise<Memecoin[]> {
  const res = await fetch(`${MEME_URL}/get-memecoins`, {
    next: { revalidate: 60, tags: ['memecoins'] },
  });
  if (!res.ok) throw new Error('Erreur fetch memecoins');
  return res.json();
}

export async function fetchMemecoin(id: string): Promise<Memecoin> {
  const res = await fetch(`${MEME_URL}/get-memecoins/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Memecoin introuvable');
  return res.json();
}
