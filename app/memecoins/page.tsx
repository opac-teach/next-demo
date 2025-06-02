'use client'

import { useEffect, useState } from 'react'
import MemecoinList from '@/components/MemecoinList'
import MemecoinForm from '@/components/MemecoinForm'

export default function MemecoinsPage() {
  const [memecoins, setMemecoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMemecoins = async () => {
    try {
      setLoading(true)
      const res = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins')
      if (!res.ok) {
        throw new Error('Erreur lors du chargement des memecoins')
      }
      const data = await res.json()
      setMemecoins(data)
      setError(null)
    } catch (err) {
      setError('Erreur lors du chargement des memecoins')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMemecoins()
    const interval = setInterval(fetchMemecoins, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Memecoins</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <MemecoinForm onSuccess={fetchMemecoins} />
        </div>
        <div className="md:w-2/3">
          {loading && <p>Chargement...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <MemecoinList memecoins={memecoins} />
        </div>
      </div>
    </div>
  ) 
}