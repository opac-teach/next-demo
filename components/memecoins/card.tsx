import Image from "next/image";
import Link from "next/link";

type MemeCoin = {
  id: string;
  name: string;
  symbol: string;
  logoUrl: string;
  description: string;
};

const MemecoinItem = ({ coin }: { coin: MemeCoin }) => (
  <Link href={`/memecoins/${coin.id}`} className="block">
    <li
      className="flex items-center gap-4 p-4 mb-3 rounded-lg shadow hover:bg-gray-100 transition cursor-pointer"
      style={{ border: "1px solid #e5e7eb" }}
    >
      <Image
        src={coin.logoUrl}
        alt={coin.name}
        width={48}
        height={48}
        className="rounded-full border"
        style={{ background: "#fff" }}
      />
      <div>
        <div className="font-bold text-lg">{coin.name}</div>
        <div className="text-gray-500 text-sm">{coin.symbol}</div>
      </div>
    </li>
  </Link>
);

export default MemecoinItem;