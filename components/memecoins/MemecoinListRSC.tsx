import Link from "next/link";
import { fetchMemecoins } from "@/services/api/memecoins";
import { Memecoin } from "@/services/interfaces";

const MemecoinListRSC = async () => {
  const memecoins: Memecoin[] = await fetchMemecoins(); 

  if (!memecoins?.length) return <span>Pas (encore) de memecoin</span>;

  return (
    <ul className="grid grid-cols-4 gap-4 list-none">
      {memecoins.map((m) => (
        <li key={m.id}>
          <Link href={`/memecoins/${m.id}`}>
            <div className="border p-2 rounded">{m.name}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MemecoinListRSC;
