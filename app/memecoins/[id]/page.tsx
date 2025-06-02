import { fetchMemecoin } from "@/services/api/memecoins";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PayCircleOutlined } from "@ant-design/icons";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const memecoin = await fetchMemecoin(params.id);
  if (!memecoin) return { title: "Memecoin non trouvé" };

  return {
    title: memecoin.name,
    description: memecoin.description,
  };
}

const MemecoinPage = async ({ params }: Props) => {
  const memecoin = await fetchMemecoin(params.id);
  if (!memecoin) return notFound();

  const imageUrl = memecoin.logoUrl || "/jc.jpg";

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white/70 rounded-3xl shadow-2xl border border-white/30 p-10 flex flex-col md:flex-row gap-10 transition-transform duration-300 hover:scale-[1.01]">
        <div className="flex justify-center md:justify-start">
          <img
            src={imageUrl}
            alt={`Logo de ${memecoin.name}`}
            width={160}
            height={160}
            className="rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>

        <div className="flex flex-col gap-6 flex-1">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-extrabold  drop-shadow-sm">
              {memecoin.name}
            </h1>
          </div>

          <div className="text-sm text-gray-700 italic flex items-center gap-2">
            <PayCircleOutlined className="text-yellow-500" />
            <span className="font-semibold">{memecoin.symbol}</span>
            <span>· par <span className="font-medium">{memecoin.owner}</span></span>
          </div>

          <p className="text-gray-800 text-base leading-relaxed">
            {memecoin.description}
          </p>
        </div>
      </div>
    </main>
  );
};

export default MemecoinPage;
