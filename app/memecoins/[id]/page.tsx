"use client";

import Image from "next/image";
import { useEffect, useState, use } from "react";

type MemeCoin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  logoUrl: string;
  description: string;
};

export default function MemecoinPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [coin, setCoin] = useState<MemeCoin | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://nuxt-demo-blush.vercel.app/api/get-memecoins/${id}`);

        if (!res.ok) {
          throw new Error(`Erreur serveur (${res.status})`);
        }

        const data = await res.json();
        setCoin(data);
      } catch (err) {
        console.error("Erreur lors du fetch de memecoin :", err);
        setError(err.message || "Une erreur inconnue est survenue.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-700"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-700 bg-red-50 border border-red-200 rounded-xl text-center text-lg font-semibold max-w-xl mx-auto mt-10 shadow">
        Erreur : {error}
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="p-8 text-gray-600 bg-gray-50 border border-gray-200 rounded-xl text-center max-w-xl mx-auto mt-10 shadow">
        Aucun memecoin trouvé.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-gradient-to-br from-green-50 via-white to-green-100 rounded-2xl shadow-lg mt-12 border border-green-100">
      <div className="flex items-center gap-6 mb-6">
        <Image
          src={coin.logoUrl || coin.image}
          alt={coin.name}
          width={80}
          height={80}
          className="rounded-full border-2 border-green-900 shadow bg-white"
        />
        <div>
          <h1 className="text-3xl font-extrabold text-green-900">{coin.name}</h1>
          <div className="text-green-700 text-xl font-mono">{coin.symbol}</div>
        </div>
      </div>
      {coin.description && (
        <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg bg-white/70 p-4 rounded-xl border border-green-100">
          {coin.description}
        </p>
      )}
    </div>
  );
}
