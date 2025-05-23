import { Suspense } from "react";
import MemecoinList from "../../components/MemeCoinList";
import { getUser } from "@/lib/auth";
import MemecoinCreateFormWrapper from "../../components/MemecoinCreateFormWrapper";


export const revalidate = 60;

export default async function MemecoinsPage() {
  const user = await getUser();

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <section>
        <h1 className="text-2xl font-bold mb-4">Liste des memecoins</h1>
        <Suspense fallback={<p>Chargement…</p>}>
          <MemecoinList />
        </Suspense>
      </section>

      {user && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Créer un memecoin</h2>
          <MemecoinCreateFormWrapper />
        </section>
      )}
    </div>
  );
}
