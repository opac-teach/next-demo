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
      className="flex flex-col sm:flex-row items-center gap-4 p-4 mb-3 rounded-2xl shadow-lg hover:bg-green-900/10 transition cursor-pointer"
      style={{
        border: "2px solid #1c3a2b",
        background: "linear-gradient(90deg, #1c3a2b 0%, #183024 100%)",
      }}
    >
      <Image
        src={coin.logoUrl}
        alt={coin.name}
        width={48}
        height={48}
        className="rounded-full border-2 border-green-900 bg-white"
        style={{ background: "#fff" }}
      />
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full">
        <div className="font-bold text-lg text-green-100">{coin.name}</div>
        <div className="text-green-300 text-sm font-mono">{coin.symbol}</div>
      </div>
    </li>
  </Link>
);

export default MemecoinItem;