'use client'

import { useEffect, useState } from 'react'
import { getMemecoins } from '@/lib/api'
import { Memecoin } from '@/types/memcoin'
import dynamic from 'next/dynamic'

const MemecoinItem = dynamic(() => import('./MemecoinItem'))

export default function MemecoinList() {
  const [coins, setCoins] = useState<Memecoin[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    try {
      const data = await getMemecoins()
      setCoins(data)
    } catch (error) {
      console.error('Erreur chargement memecoins', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <p>Chargement de la liste…</p>

  return (
    <ul className="space-y-2">
      {coins.map((coin) => (
        <MemecoinItem key={coin.id} coin={coin} />
      ))}
    </ul>
  )
}
