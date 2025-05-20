import { NextResponse } from 'next/server';

export async function GET() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete('token');
  return res;
}
