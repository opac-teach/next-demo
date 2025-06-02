'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import MemecoinForm from "@/components/memecoin/MemecoinForm";

export default function MemecoinAddClient() {
  const [isOpen, setIsOpen] = useState(false);

  function handleSuccess() {
    setIsOpen(false);
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Ajouter un Memecoin</Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Nouveau Memecoin</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">&times;</button>
            </div>
            <MemecoinForm onSuccess={handleSuccess} />
          </div>
        </div>
      )}
    </>
  );
}