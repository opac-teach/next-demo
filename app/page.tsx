import { getAuthenticatedUser } from "@/lib/auth";

export default async function Home() {
  const user = await getAuthenticatedUser();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Hello NextJS !</h1>

      {user ? (
        <p className="text-lg">
          Bienvenue <strong>{user.username}</strong> — Solde : <strong>{user.balance.toFixed(2)} ZTH</strong>
        </p>
      ) : (
        <p className="text-gray-600">Connectez-vous pour voir votre solde ZTH.</p>
      )}
    </div>
  );
}