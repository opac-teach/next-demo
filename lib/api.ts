import { Memecoin } from '@/types/memcoin'

export async function getMemecoin(id: string): Promise<Memecoin> {
  const res = await fetch(
    `https://nuxt-demo-blush.vercel.app/api/get-memecoins/${id}`,
    { cache: 'no-store' }
  )
  if (!res.ok) {
    throw new Error(`${res.status}`)
  }
  return res.json()
}

export async function getMemecoins(): Promise<Memecoin[]> {
  const res = await fetch(
    'https://nuxt-demo-blush.vercel.app/api/get-memecoins',
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error(`Erreur ${res.status}`)
  return res.json()
}

export async function createMemecoin(body: {
    name: string
    symbol: string
    description?: string
    logoUrl?: string
  }): Promise<Memecoin> {
    const res = await fetch(
      'https://nuxt-demo-blush.vercel.app/api/create-memecoin',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
  
    const payload = await res.json()
    if (!res.ok) throw new Error(payload.message || 'Erreur création')
    return payload
  }