import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const memecoinsData = [
  {
    name: "Memecoin 1",
    symbol: "X7B",
    owner: "bmebp0aem1d",
    description: "Memecoin 1 description",
    logoUrl: "https://picsum.photos/seed/memecoin1/50/50"
  },
  {
    name: "Memecoin 2",
    symbol: "0YH",
    owner: "bmebp0aem1d",
    description: "Memecoin 2 description",
    logoUrl: "https://picsum.photos/seed/memecoin2/50/50"
  },
  {
    name: "Memecoin 3",
    symbol: "T7P",
    owner: "sv9nzb02gwh",
    description: "Memecoin 3 description",
    logoUrl: "https://picsum.photos/seed/memecoin3/50/50"
  }
]

export async function POST() {
  try {
    await prisma.memecoin.deleteMany()
    
    const memecoins = await prisma.memecoin.createMany({
      data: memecoinsData
    })

    return NextResponse.json({ message: 'Données ajoutées avec succès', count: memecoins.count })
  } catch (error) {
    console.error('Error seeding memecoins:', error)
    return NextResponse.json(
      { error: 'Failed to seed memecoins' },
      { status: 500 }
    )
  }
} 