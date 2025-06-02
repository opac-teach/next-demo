'use client'

import { useEffect } from 'react'

interface Props {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error('Erreur dans /memecoins:', error)
  }, [error])

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold text-red-600">Oups, quelque chose a cassé</h1>
      <p className="mt-2">{error.message}</p>
      
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Réessayer
      </button>
    </div>
  )
}
