import '../app/globals.css';
import NavBar from '@/components/NavBar';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Memecoin Lab',
  description: 'Demo Next 14 – exercices RSC / JWT / streaming',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
