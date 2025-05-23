import {getMemecoin} from "@/lib/actions";
import Link from "next/link";
import {Metadata} from "next";

// Metadata for SEO
export async function generateMetadata(
    {
        params,
    }: {
        params: Promise<{ id: string }>;
    }): Promise<Metadata> {
    const {id} = await params;

    const memecoin = await getMemecoin(id);

    return {
        title: memecoin.name,
        description: memecoin.description,
        openGraph: {
            type: "website",
            url: "https://localhost:3000/memecoins/" + memecoin.id,
            title: memecoin.name,
            description: "Memecoin battle",
            siteName: "Memecoin",
            images: [{url: memecoin.logoUrl}]
        }
    };
}

export default async function Page({params}: { params: any }) {

    const memecoin = await getMemecoin(params.id);

    return (
        <div>
            {!memecoin.error ?
                <div>
                    <h1>{memecoin.name}</h1>
                    <p>Symbol: {memecoin.symbol}</p>
                    <p>Description: {memecoin.description}</p>
                    <img src={memecoin.logoUrl} alt={memecoin.name} width={100} height={100}/>
                    <Link href="/memecoins"
                          className="mb-4 font-bold data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4"><span
                        aria-hidden="true">&larr;</span> Back</Link>
                </div>
                :
                <div>
                    <h1 className="text-center">memecoin not found</h1>
                </div>
            }
        </div>
    );
}