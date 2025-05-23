import Link from 'next/link';
import { getUser } from '@/lib/auth';

import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

export default async function NavBar() {
  const user = await getUser();

  return (
    <header className="border-b">
      <nav className="container mx-auto flex items-center gap-6 p-4">
        <Link href="/">Home</Link>
        <Link href="/memecoins">Memecoins</Link>
        <div className="ml-auto">
          {user ? <LogoutButton /> : <LoginButton />}
        </div>
      </nav>
    </header>
  );
}
