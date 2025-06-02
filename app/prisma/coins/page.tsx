import {getMemecoins} from "@/lib/coinUtils";
import {Memecoin, User} from "@/app/generated/prisma";
import Link from "next/link";
import {getUser} from "@/lib/userUtils";
import {CoinItem} from "@/components/prisma/CoinItem";
import {Suspense} from "react";
import {CoinItemSkeleton} from "@/components/prisma/CoinItemSkeleton";

function MemecoinsLoading() {
    return (
        <>
            <CoinItemSkeleton />
            <CoinItemSkeleton />
            <CoinItemSkeleton />
            <CoinItemSkeleton />
            <CoinItemSkeleton />
            <CoinItemSkeleton />
            <CoinItemSkeleton />
        </>

    );
}

export default async function Memecoins() {
    const user: User | null = await getUser();

    return (
        <div data-test="memecoins-list" className="min-h-auto pt-8 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
                Memecoins List
            </h1>
            <Link href="/prisma/coins/create"
                  className="mb-4 font-bold data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4"
                  data-test="create-memecoin">
                Create memecoin
            </Link>
            <Suspense fallback={<MemecoinsLoading />}>
                <MemecoinsContent user={user} />
            </Suspense>
        </div>
    );
}

async function MemecoinsContent({ user }: { user: User | null }) {
    const memecoins = await getMemecoins();
    return (
        <>
            {memecoins.map((memecoin: Memecoin) => (
                <CoinItem memecoin={memecoin} user={user} key={memecoin.id}/>
            ))}
        </>
    );
}
