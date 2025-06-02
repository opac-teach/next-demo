'use client';

import { useEffect, useState } from "react";

type Props = {
  error: string;
};

export default function NotificationError({ error }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg shadow-md">
        <strong className="block font-semibold">Erreur :</strong>
        <span className="text-sm">{error}</span>
      </div>
    </div>
  );
}