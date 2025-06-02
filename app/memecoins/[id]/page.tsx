"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type MemeCoin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  logoUrl: string;
  description: string;
};

export default function MemecoinPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const [coin, setCoin] = useState<MemeCoin | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://nuxt-demo-blush.vercel.app/api/get-memecoins/${id}`, { cache: "no-store" });
      if (!res.ok) {
        setError("Memecoin introuvable.");
        return;
      }
      const data = await res.json();
      setCoin(data);
    };
    fetchData();
  }, [id]);

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  if (!coin) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={coin.logoUrl || coin.image}
          alt={coin.name}
          width={64}
          height={64}
          className="rounded-full border bg-white"
        />
        <div>
          <h1 className="text-2xl font-bold">{coin.name}</h1>
          <div className="text-gray-500 text-lg">{coin.symbol}</div>
        </div>
      </div>
      {coin.description && (
        <p className="text-gray-700 whitespace-pre-line">{coin.description}</p>
      )}
    </div>
  );
}