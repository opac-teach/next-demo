import MemecoinItem from './MemecoinItem'

export default function MemecoinList({ memecoins }: { memecoins: any[] }) {
  return (
    <div className="grid gap-4 mt-4">
      {memecoins.map((coin) => (
        <MemecoinItem key={coin.symbol} coin={coin} />
      ))}
    </div>
  )
}