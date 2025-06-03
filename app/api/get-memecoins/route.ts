import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const memecoins = await prisma.memecoin.findMany()
    console.log('Memecoins trouvés:', memecoins)
    return NextResponse.json(memecoins)
  } catch (error) {
    console.error('Erreur détaillée:', error)
    return NextResponse.json(
      { error: 'Failed to fetch memecoins', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 