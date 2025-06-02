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
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl mb-4">Connexion</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border px-2 py-1 w-full mb-2"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border px-2 py-1 w-full mb-2"
      />
      <button className="w-full bg-blue-600 text-white py-1 rounded" type="submit">
        Se connecter
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </form>
  );
}