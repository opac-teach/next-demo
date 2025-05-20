'use server';

import { z } from 'zod';
import { revalidateTag } from 'next/cache';

const schema = z.object({
  name: z.string().min(4).max(16),
  symbol: z.string().min(2).max(4).regex(/^[A-Z]+$/),
  description: z.string().max(1000).optional(),
  logoUrl: z.string().url().max(200).optional(),
});

export async function createMemecoin(data: unknown) {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: 'Validation échouée' };
  }

  try {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => null);
      return { ok: false, error: json?.message ?? 'Erreur inconnue' };
    }

    revalidateTag('memecoins');
    return { ok: true };
  } catch {
    return { ok: false, error: 'Erreur réseau ou serveur' };
  }
}
