import { Suspense } from 'react';
import { fetchMemecoins } from '@/lib/api';
import MemecoinItem from './MemecoinItem';

export default async function MemecoinList() {
  const memecoins = await fetchMemecoins();

  return (
    <ul className="space-y-4">
      {memecoins.map(mc => (
        <MemecoinItem key={mc.id} memecoin={mc} />
      ))}
    </ul>
  );
}
