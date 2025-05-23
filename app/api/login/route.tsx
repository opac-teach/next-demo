import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin42';
const JWT_SECRET = process.env.JWT_SECRET ?? 'very-secret';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });

  const res = NextResponse.json({ ok: true });
  res.cookies.set('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 3600,
  });
  return res;
}
