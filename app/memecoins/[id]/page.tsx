import { notFound } from 'next/navigation';
import MemecoinDetails from './MemecoinDetails';
import { getMemecoin } from '@/lib/memecoins';
import type { Metadata, ResolvingMetadata } from 'next';

interface MemecoinPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const memecoin = await getMemecoin(params.id).catch(() => null);

  if (!memecoin) {
    return {
      title: 'Memecoin introuvable',
      description: "Le memecoin demandé n'existe pas",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${memecoin.name} (${memecoin.symbol}) - Détails du Memecoin`,
    description: memecoin.description || `Découvrez les détails du memecoin ${memecoin.name}`,
    openGraph: {
      title: `${memecoin.name} (${memecoin.symbol})`,
      description: memecoin.description || `Découvrez les détails du memecoin ${memecoin.name}`,
      url: `/memecoins/${params.id}`,
      siteName: 'Plateforme de Memecoins',
      images: memecoin.logoUrl
        ? [{ url: memecoin.logoUrl, width: 800, height: 600, alt: `Logo de ${memecoin.name}` }, ...previousImages]
        : previousImages,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${memecoin.name} (${memecoin.symbol})`,
      description: memecoin.description || `Découvrez les détails du memecoin ${memecoin.name}`,
      images: memecoin.logoUrl ? [memecoin.logoUrl] : [],
    },
  };
}

export default async function MemecoinPage({ params }: MemecoinPageProps) {
  const memecoin = await getMemecoin(params.id).catch(() => null);

  if (!memecoin) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <MemecoinDetails memecoin={memecoin} />
    </div>
  );
}