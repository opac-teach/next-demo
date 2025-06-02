import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Memecoin } from '@/components/Memecoin'
import { Metadata } from 'next'

export default async function MemecoinDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await fetch(`https://nuxt-demo-blush.vercel.app/api/get-memecoins/${id}`)
  if (!res.ok) return notFound()
  const coin: Memecoin = await res.json()

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-white/90 shadow-xl rounded-2xl border border-gray-200 px-10 py-8 max-w-lg w-full">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={coin.logoUrl}
            alt={coin.name}
            width={120}
            height={120}
            className="rounded-full border border-gray-100 shadow-lg bg-white object-contain"
          />
          <h1 className="text-3xl font-extrabold text-green-700 mb-2 text-center">
            {coin.name} <span className="text-gray-500 font-normal">({coin.symbol})</span>
          </h1>
          <p className="text-gray-700 text-base text-center mb-2">
            {coin.description || 'Aucune description.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const res = await fetch(`https://nuxt-demo-blush.vercel.app/api/get-memecoins/${id}`)
  if (!res.ok) return {}
  const coin: Memecoin = await res.json()

  return {
    title: `${coin.name} (${coin.symbol})`,
    description: coin.description || 'Aucune description.',
    openGraph: {
      title: `${coin.name} (${coin.symbol})`,
      description: coin.description || 'Aucune description.',
      images: [coin.logoUrl],
    },
  }
}