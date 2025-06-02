'use client'

import { useEffect } from 'react'

interface Props {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error('Erreur dans /memecoins/[id] :', error)
  }, [error])

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold text-red-600">Une erreur est survenue</h1>
      <p className="mt-2">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Réessayer
      </button>
    </div>
  )
}
