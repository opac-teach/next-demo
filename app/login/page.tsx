"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError("Mot de passe incorrect");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg border border-gray-100"
    >
      <h1 className="text-2xl font-extrabold text-center text-green-900 mb-6 tracking-tight">
        Connexion
      </h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 px-3 py-2 w-full mb-4 rounded-lg outline-none transition"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 px-3 py-2 w-full mb-4 rounded-lg outline-none transition"
      />
      <button
        className="w-full bg-gradient-to-r from-green-900 to-green-700 text-white py-2 rounded-lg font-semibold shadow hover:from-green-800 hover:to-green-600 transition"
        type="submit"
      >
        Se connecter
      </button>
      {error && (
        <div className="text-red-600 mt-4 text-center font-medium bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}
    </form>
  );
}