'use client';

import {Memecoin} from "@/lib/Memecoin";
import React from "react";
import Link from "next/link";

export function MemecoinItem({params}: { params: Memecoin }) {

    const { name, logoUrl, description, symbol, owner, id } = params;

    return (
        <div key={id} className="flex flex-col items-start justify-between w-100 border-b-blue-950 border-b-2 p-4 mb-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-1 w-full font-bold text-2xl">
                <Link className="mb-4 font-bold data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4"
                      href={`/memecoins/${id}`}>{name} : {id}</Link>
            </div>
            <div className="flex items-center justify-center gap-1 w-full">
                <img className="rounded-4xl w-8" src={logoUrl} width={50}
                       height={50} alt=""/>
                <span className="font-bold">{symbol}</span>
            </div>
            <div className="flex  flex-col items-center justify-between w-full">
                <span>Propriétaire : {owner}</span>
                <span>{description}</span>
            </div>
        </div>
    );
}
