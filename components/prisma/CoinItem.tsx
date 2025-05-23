'use client';

import {Memecoin, User} from "@/app/generated/prisma";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {deleteMemecoin} from "@/lib/coinUtils";

export function CoinItem({memecoin, user}: { memecoin: Memecoin, user: User }){

    return(
    <li key={memecoin.id}>
        <Link href={`/prisma/coins/${memecoin.id}`}
              className="mb-4 font-bold data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4">
            <span className="font-semibold">{memecoin.name}</span>
        </Link>
        <span className="text-sm text-gray-600 ml-2">

              by {memecoin.author.name}
            </span>
        {memecoin.author.id === user.id &&
            <Button className="ml-4" variant="destructive" onClick={() => deleteMemecoin(memecoin.id)}>Delete</Button>
        }
    </li>)
}