import { Suspense } from 'react';
import MemecoinList from './MemecoinList';
import CreateMemecoinForm from './CreateMemecoinForm';
import AutoRefresh from './AutoRefresh';
import { Metadata } from 'next';
import { isAuthenticated } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Memecoins - Liste',
  description: 'Découvrez les memecoins les plus populaires'
};

export default async function MemecoinsPage() {
  const authenticated = await isAuthenticated();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Liste des Memecoins</h1>

      <AutoRefresh intervalSeconds={60} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Memecoins populaires</h2>
          <Suspense fallback={<div className="p-4 border rounded-md">Chargement des memecoins...</div>}>
            <MemecoinList />
          </Suspense>
        </div>

        {authenticated && (
          <div className="md:col-span-1">
            <h2 className="text-2xl font-semibold mb-4">Créer un memecoin</h2>
            <CreateMemecoinForm />
          </div>
        )}
      </div>
    </div>
  );
}