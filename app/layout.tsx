// app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import './globals.css'
import Header from '@/components/header'

const SECRET = 'd7bef0bfae1f4561b272157760364cce845dc880ceba5e2f256979a6accccd41'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextJS Demo App',
  description: 'Memecoin demo with JWT auth',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token       = cookieStore.get('token')?.value

  let authenticated = false
  if (token) {
    try {
      jwt.verify(token, SECRET)
      authenticated = true
    } catch {}
  }

  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <Header authenticated={authenticated} />
        <main className="p-4 flex flex-col mx-4">{children}</main>
      </body>
    </html>
  )
}