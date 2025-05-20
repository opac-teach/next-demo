'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      await fetch('/api/logout', {
        method: 'POST',
      });

      router.refresh();

      router.push('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleLogout} 
      disabled={isLoading}
    >
      {isLoading ? 'Déconnexion...' : 'Se déconnecter'}
    </Button>
  );
}