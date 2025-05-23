'use client';
import { useTransition } from 'react';
import { logout } from '../app/server-actions/auth';

export default function LogoutButton() {
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => start(() => logout())}
      className="btn"
    >
      Se déconnecter
    </button>
  );
}
