"use client";

import React, { useEffect, useState } from "react";
import MemecoinList from "@/components/memecoins/cardList";
import CreateMemecoinForm from "@/components/memecoins/createCard";

type MemeCoin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  logoUrl: string;
  description: string;
};

const MemeCoinsPage = () => {
  const [memecoins, setMemecoins] = useState<MemeCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchMemecoins = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://nuxt-demo-blush.vercel.app/api/get-memecoins");
      if (!res.ok) {
        throw new Error(`Erreur ${res.status} lors du chargement des memecoins`);
      }
      const data = await res.json();
      setMemecoins(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erreur lors du fetch des memecoins :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemecoins();
    const interval = setInterval(fetchMemecoins, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 mt-10 border border-gray-100">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
        Liste des Memecoins
      </h1>
      <div className="flex justify-center gap-3 mb-8">
        <button
          className={`px-4 py-2 rounded-lg border text-base font-medium transition
            ${!showForm
              ? "bg-green-50 text-green-900 border-green-200 shadow-sm"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          onClick={() => setShowForm(false)}
          disabled={!showForm}
        >
          Voir la liste
        </button>
        <button
          className={`px-4 py-2 rounded-lg border text-base font-medium transition
            ${showForm
              ? "bg-blue-50 text-blue-900 border-blue-200 shadow-sm"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          onClick={() => setShowForm(true)}
          disabled={showForm}
        >
          Créer un memecoin
        </button>
      </div>
      <div className="min-h-[200px]">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-700"></span>
          </div>
        ) : showForm ? (
          <section>
            <CreateMemecoinForm onCreated={fetchMemecoins} />
          </section>
        ) : (
          <section className="flex flex-col gap-4">
            <MemecoinList memecoins={memecoins} />
          </section>
        )}
      </div>
    </div>
  );
};

export default MemeCoinsPage;
