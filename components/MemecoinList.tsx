import MemecoinItem from './MemecoinItem'

export default function MemecoinList({ memecoins }: { memecoins: any[] }) {
  return (
    <div className="bg-white/80 shadow-xl rounded-xl px-8 py-8 border border-gray-200">
      <h2 className="text-xl font-bold text-center mb-2 text-green-700">Liste des memecoins</h2>
      <div className="grid gap-4 mt-4">
        {memecoins.map((coin) => (
          <MemecoinItem key={coin.symbol} coin={coin} />
        ))}
      </div>
    </div>
  )
}