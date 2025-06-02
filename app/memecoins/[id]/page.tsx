import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Memecoin } from '@/components/Memecoin'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function MemecoinDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await fetch(`https://nuxt-demo-blush.vercel.app/api/get-memecoins/${id}`)
  if (!res.ok) return notFound()
  const coin: Memecoin = await res.json()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{coin.name} ({coin.symbol})</h1>
      <Image src={coin.logoUrl} alt={coin.name} width={96} height={96} className="mb-4 object-contain" />
      <p className="text-lg">{coin.description || 'Aucune description.'}</p>
    </div>
  )
} 

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const { id } = await params
//   const res = await fetch(`https://nuxt-demo-blush.vercel.app/api/get-memecoins/${id}`)
//   if (!res.ok) return {}
//   const coin: Memecoin = await res.json()
 
//   return {
//     title: `${coin.name} (${coin.symbol})`,
//     description: coin.description || 'Aucune description.',
//     openGraph: {
//       title: `${coin.name} (${coin.symbol})`,
//       description: coin.description || 'Aucune description.',
//       images: [coin.logoUrl],
//     },
//   }
// }