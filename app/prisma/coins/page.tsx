import {getMemecoins} from "@/lib/coinUtils";
import {Memecoin, User} from "@/app/generated/prisma";
import Link from "next/link";
import {cookies} from "next/headers";
import {getUser} from "@/lib/userUtils";
import {CoinItem} from "@/components/prisma/CoinItem";

export default async function Memecoins() {
    const memecoins = await getMemecoins();
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    let user: User;
    if (session) {
        user = await getUser(session?.value);
    }

    return (
        <div className="min-h-auto pt-16 bg-gray-50 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
                Memecoins
            </h1>
            <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4">
                {memecoins.map((memecoin: Memecoin) => (

                    <CoinItem memecoin={memecoin} user={user} key={memecoin.id} />
                ))}
            </ul>
            <Link href="/prisma/coins/create"
                  className="mb-4 font-bold data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4">
                Create memecoin
            </Link>
        </div>
    );
}