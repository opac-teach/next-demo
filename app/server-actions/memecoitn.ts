'use server';

import { z } from 'zod';
import { revalidateTag } from 'next/cache';

const schema = z.object({
  name: z.string().min(4).max(16),
  symbol: z.string().min(2).max(4).regex(/^[A-Z]+$/),
  description: z.string().max(1000).optional(),
  logoUrl: z.string().url().max(200).optional(),
});

export async function createMemecoin(raw: unknown) {
  const data = schema.parse(raw);

  const res = await fetch(
    'https://nuxt-demo-blush.vercel.app/api/create-memecoin',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    const json = await res.json().catch(() => null);
    throw new Error(json?.message ?? 'Erreur inconnue');
  }

  // rafraîchir la liste
  revalidateTag('memecoins');
}
