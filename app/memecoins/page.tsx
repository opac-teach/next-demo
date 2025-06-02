import { Suspense } from 'react'
import MemecoinList from '@/components/MemecoinList'
import CreateMemecoinForm from '@/components/CreateMemecoinForm'

export const revalidate = 0

export default function MemecoinsPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">Liste des Memecoins</h1>

      <Suspense fallback={<p>Chargement de la liste…</p>}>
        <MemecoinList />
      </Suspense>

      <h2 className="text-2xl font-semibold">Créer un nouveau Memecoin</h2>
      <CreateMemecoinForm />
    </div>
  )
}
