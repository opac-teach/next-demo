'use client';
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.push('/login')} className="btn">
      Se connecter
    </button>
  );
}
