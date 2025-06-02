'use client';

import Link from "next/link";
import {Memecoin, User} from "@/app/generated/prisma";
import {Button} from "@/components/ui/button";
import {deleteMemecoin} from "@/lib/coinUtils";

export default function CoinDetails({memecoin, user}: {memecoin: Memecoin, user: User | null}) {

    return (
        <div className="min-h-auto flex flex-col items-center justify-center">
            <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)] mt-4 flex flex-col items-center justify-center">
                <span className="text-4xl text-center font-bold mb-2 text-[#333333]">{memecoin.name} <span className="text-center text-2xl font-bold mb-8 text-[#333333]">({memecoin.symbol})</span></span>

                <p className="text-gray-600 text-center">by {memecoin.author.name}</p>
                {memecoin.logoUrl && <img className="rounded-4xl" src={memecoin.logoUrl} alt={memecoin.name} width={50} height={50} />}
                <div className="prose prose-gray mt-8">
                    {memecoin.description || "No description available."}
                </div>
            </article>
            {memecoin.author.id === user?.id &&
                <Button variant="destructive" onClick={() => deleteMemecoin(memecoin.id)}>Delete</Button>
            }
            <Link href="/prisma/coins"
                  className="p-2 mt-4 font-bold data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex gap-1 rounded-sm text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4">
                Back
            </Link>
        </div>
    )
}