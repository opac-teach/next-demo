"use client";

import { useCallback, useEffect, useState } from "react";
import { PayCircleOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { Memecoin } from "@/services/interfaces";

interface MemecoinProps {
  memecoin: Memecoin;
}

const MemecoinItem: React.FC<MemecoinProps> = ({ memecoin }) => {
  const imageUrl = memecoin.logoUrl || "/jc.jpg";

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("favorites");
      if (!raw) return;
      const list: Memecoin[] = JSON.parse(raw);
      setIsFavorite(list.some((c) => c.id === memecoin.id));
    } catch (e) {
      console.error("Erreur lecture favoris :", e);
    }
  }, [memecoin.id]);

  const toggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        const raw = localStorage.getItem("favorites");
        const current = raw ? (JSON.parse(raw) as Memecoin[]) : [];

        const exists = current.some((c) => c.id === memecoin.id);
        const next = exists
          ? current.filter((c) => c.id !== memecoin.id)
          : [...current, memecoin];

        localStorage.setItem("favorites", JSON.stringify(next));
        setIsFavorite(!exists);
      } catch (err) {
        console.error("Impossible d’ajuster les favoris :", err);
      }
    },
    [memecoin]
  );

  return (
    <div className="bg-gray-100 rounded-l p-6 shadow-md hover:shadow-lg h-full flex gap-6 items-center w-full max-w-md">
      <img
        src={imageUrl}
        alt={`logo de ${memecoin.name}`}
        className="w-24 h-24 object-cover rounded-full border border-gray-300 flex-shrink-0"
      />

      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold font-mono">{memecoin.name}</p>

          {isFavorite ? (
            <StarFilled
              onClick={toggleFavorite}
              className="text-yellow-400 cursor-pointer hover:scale-110 transition-transform"
            />
          ) : (
            <StarOutlined
              onClick={toggleFavorite}
              className="cursor-pointer hover:scale-110 transition-transform"
            />
          )}
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-700">
          <span className="flex items-center gap-1 italic">
            <PayCircleOutlined /> {memecoin.symbol}
          </span>
          <span className="italic">par {memecoin.owner}</span>
        </div>

        <p className="text-gray-500 text-sm line-clamp-3">
          {memecoin.description}
        </p>
      </div>
    </div>
  );
};

export default MemecoinItem;
