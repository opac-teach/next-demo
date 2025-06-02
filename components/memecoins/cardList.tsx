import MemecoinItem from "./card";

type MemeCoin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  logoUrl: string;
  description: string;
};

const MemecoinList = ({ memecoins }: { memecoins: MemeCoin[] }) => (
  <ul>
    {memecoins.map((coin) => (
      <MemecoinItem key={coin.id} coin={coin} />
    ))}
  </ul>
);

export default MemecoinList;