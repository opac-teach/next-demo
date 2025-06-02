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

  const fetchMemecoins = () => {
    setLoading(true);
    fetch("https://nuxt-demo-blush.vercel.app/api/get-memecoins")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMemecoins(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchMemecoins();
    const interval = setInterval(fetchMemecoins, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Liste des Memecoins</h1>
      <div className="mt-4 mb-4 flex gap-2">
        <button
          className="px-3 py-1 rounded border text-sm bg-white text-gray-700 hover:bg-gray-100"
          onClick={() => setShowForm(false)}
          disabled={!showForm}
        >
          Voir la liste
        </button>
        <button
          className="px-3 py-1 rounded border text-sm bg-white text-gray-700 hover:bg-gray-100"
          onClick={() => setShowForm(true)}
          disabled={showForm}
        >
          Créer un memecoin
        </button>
      </div>
      {loading ? (
        <p>Chargement...</p>
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
  );
};

export default MemeCoinsPage;