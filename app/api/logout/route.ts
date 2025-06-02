import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export async function POST() {
    const cookieStore = await cookies();

    cookieStore.delete('access_token')
    cookieStore.delete('user')

    return NextResponse.json({ok: true})
}