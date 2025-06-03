import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.name || !body.symbol || !body.owner || !body.description) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    const memecoin = await prisma.memecoin.create({
      data: {
        name: body.name,
        symbol: body.symbol,
        owner: body.owner,
        description: body.description,
        logoUrl: body.logoUrl || `https://picsum.photos/seed/${body.symbol}/50/50`
      }
    })

    return NextResponse.json(memecoin, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création du memecoin:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du memecoin', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 