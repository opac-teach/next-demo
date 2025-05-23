"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Memecoin {
    id: string;
    name: string;
    symbol: string;
    logoUrl: string;
    description: string;
    owner: string;
}

interface MemecoinsCardProps {
    memecoin: Memecoin;
}

export function MemecoinsCard({ memecoin }: MemecoinsCardProps) {
    return (
        <Link href={`/memecoins/${memecoin.id}`}>
            <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                        {memecoin.logoUrl ? <Image
                            src={memecoin.logoUrl}
                            alt={memecoin.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                        /> : (
                            <div>
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold">{memecoin.name}</h3>
                        <p className="text-sm text-gray-500 uppercase">{memecoin.symbol}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-1">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 mb-1">Description</span>
                            <p className="text-sm line-clamp-3">{memecoin.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t">
                            <span className="text-sm text-gray-500">Propriétaire</span>
                            <span className="font-medium text-sm truncate max-w-[150px]">{memecoin.owner}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}