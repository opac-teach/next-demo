'use client';

import dynamic from 'next/dynamic';

const MemecoinCreateForm = dynamic(
  () => import('./MemecoinCreateForm'),
  { ssr: false }
);

export default function MemecoinCreateFormWrapper() {
  return <MemecoinCreateForm />;
}
