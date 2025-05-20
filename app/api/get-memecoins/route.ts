export async function GET() {
  const res = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins', {
    cache: 'no-store',
  });
  return new Response(res.body, { status: res.status });
}
