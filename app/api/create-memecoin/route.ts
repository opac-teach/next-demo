import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const res = await fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
  });
  return new Response(res.body, { status: res.status });
}
