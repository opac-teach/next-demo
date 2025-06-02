import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMemecoin } from '@/lib/api'
import Image from 'next/image'
import { Memecoin } from '@/types/memcoin'

interface Props {
  params: { id: string }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const coin = await getMemecoin(params.id)
    return {
      title: `${coin.name} (${coin.symbol}) • Memecoin`,
      description: coin.description,
      openGraph: {
        title: `${coin.name} (${coin.symbol})`,
        description: coin.description,
        images: coin.logoUrl
          ? [{ url: coin.logoUrl, alt: coin.name }]
          : undefined,
        siteName: 'Memecoin App',
        url: `${API_URL}/memecoins/${coin.id}`,
        type: 'website',
      },
    }
  } catch {
    return {
      title: 'Memecoin non trouvé',
    }
  }
}

export default async function MemecoinPage({ params }: Props) {
  let coin: Memecoin
  try {
    coin = await getMemecoin(params.id) 
  } catch (err) {
    if (err === '404') {
    notFound()
    } else if (err === '500') {
      throw new Error('Erreur chargement memecoin')
    } else {
      throw new Error('Le memecoin que vous recherchez n\'existe plus.')
    }
  }

  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-4xl font-bold">
        {coin.name} <span className="text-gray-500">({coin.symbol})</span>
      </h1>

      {coin.logoUrl && (
        <div className="w-32 h-32 relative">
          <Image
            src={coin.logoUrl}
            alt={coin.name}
            fill
            className="object-contain rounded-full"
          />
        </div>
      )}

      {coin.description && (
        <p className="text-lg leading-relaxed">{coin.description}</p>
      )}
    </div>
  )
}