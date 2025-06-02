import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const memecoins = await prisma.memecoin.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(memecoins)
  } catch (error: any) {
    console.error('GET /api/get-memecoins error', error)
    return NextResponse.json(
      { error: 'Impossible de récupérer les memecoins' },
      { status: 500 }
    )
  }
}
