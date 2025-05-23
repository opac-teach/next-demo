
import { notFound } from "next/navigation";
import {getMemecoin} from "@/lib/coinUtils";
import {Memecoin} from "@/app/generated/prisma";
import Link from "next/link";

export default async function GetMemecoin({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const memecoin: Memecoin = await getMemecoin(id);
    if (!memecoin) {
        notFound();
    }

    return (
        <div className="min-h-auto bg-gray-50 flex flex-col items-center justify-center">
            <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)] mt-4 flex flex-col items-center justify-center">
                <h1 className="text-4xl text-center font-bold mb-8 text-[#333333]">{memecoin.name}</h1>
                <h3 className="text-4xl text-center font-bold mb-8 text-[#333333]">{memecoin.symbol}</h3>
                <p className="text-gray-600 text-center">by {memecoin.author.name}</p>
                {memecoin.logoUrl && <img className="rounded-4xl" src={memecoin.logoUrl} alt={memecoin.name} width={50} height={50} />}
                <div className="prose prose-gray mt-8">
                    {memecoin.description || "No content available."}
                </div>
            </article>
            <Link href="/prisma/coins"
                  className="mb-4 mt-4 font-bold data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4">
                Back
            </Link>
        </div>

    );
}