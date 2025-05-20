import { fetchMemecoin } from '@/lib/api';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = { params: { id: string } };

export const dynamic = 'force-static';
export const revalidate = 60;

export async function generateMetadata({ params }: Props) {
  const mc = await fetchMemecoin(params.id).catch(() => null);
  if (!mc) return {};

  return {
    title: `${mc.name} (${mc.symbol})`,
    openGraph: {
      title: mc.name,
      description: mc.description,
      images: mc.logoUrl ? [{ url: mc.logoUrl }] : [],
    },
  };
}

export default async function MemecoinPage({ params }: Props) {
  const mc = await fetchMemecoin(params.id).catch(() => null);
  if (!mc) notFound();

  return (
    <article className="prose">
      <h1>{mc.name} ({mc.symbol})</h1>

      {mc.logoUrl && (
        <Image
          src={mc.logoUrl}
          alt={mc.name}
          width={128}
          height={128}
          className="rounded-xl"
        />
      )}

      {mc.description && <p>{mc.description}</p>}
    </article>
  );
}
