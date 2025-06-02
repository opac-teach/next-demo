'use client';

import { useRouter } from 'next/navigation';

export const Logout = () => {
    
  const router = useRouter();

  const logOut = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });

    router.refresh();
  };

  return (
    <div className="border border-grey-300 shadow-md p-6 rounded-lg flex flex-col gap-4 w-md justify-self-center">
        <span className="text-xl capitalize text-center">se déconnecter</span>
        <button className="text-base capitalize text-center rounded-lg bg-red-200 border border-red-400 p-2 text-red-800" onClick={logOut}>déconnexion</button>
    </div>
  );
};
