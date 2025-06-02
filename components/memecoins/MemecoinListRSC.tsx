import Link from "next/link";
import { fetchMemecoins } from "@/services/api/memecoins";
import { Memecoin } from "@/services/interfaces";

const MemecoinListRSC = async () => {
  const memecoins: Memecoin[] = await fetchMemecoins(); 

  if (!memecoins?.length) return <span>Pas de memecoin</span>;

  return (
    <ul className="grid grid-cols-4 gap-4 list-none">
      {memecoins.map((memecoin) => (
        <li key={memecoin.id} className="border p-2 rounded ">
          <Link href={`/memecoins/${memecoin.id}`} className="flex flex-col gap-2" >
            <span >{memecoin.name}</span>
            <span >{memecoin.description}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MemecoinListRSC;
