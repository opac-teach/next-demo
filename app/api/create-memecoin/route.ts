import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { name, symbol, description, logoUrl } = await req.json()

    if (typeof name !== 'string' || name.length < 4 || name.length > 16) {
      return NextResponse.json(
        { error: 'Le name doit avoir entre 4 et 16 caractères' },
        { status: 400 }
      )
    }
    if (typeof symbol !== 'string' || !/^[A-Z]{2,4}$/.test(symbol)) {
      return NextResponse.json(
        { error: 'Le symbol doit être 2–4 lettres MAJUSCULES' },
        { status: 400 }
      )
    }
    if (description && description.length > 1000) {
      return NextResponse.json(
        { error: 'La description ne doit pas dépasser 1000 caractères' },
        { status: 400 }
      )
    }
    if (logoUrl) {
      try {
        new URL(logoUrl)
      } catch {
        return NextResponse.json(
          { error: 'Le logoUrl n’est pas une URL valide' },
          { status: 400 }
        )
      }
    }

    const newCoin = await prisma.memecoin.create({
      data: {
        name,
        symbol,
        description: description || null,
        logoUrl: logoUrl || null,
      },
    })

    return NextResponse.json(newCoin, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/create-memecoin error', error)
    if (
      error.code === 'P2002' &&
      error.meta?.target?.includes('symbol')
    ) {
      return NextResponse.json(
        { error: 'Symbol déjà utilisé' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Création échouée' },
      { status: 500 }
    )
  }
}
