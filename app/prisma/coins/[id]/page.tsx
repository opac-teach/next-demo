
import { notFound } from "next/navigation";
import {getMemecoin} from "@/lib/coinUtils";
import {Memecoin, User} from "@/app/generated/prisma";
import {getUser} from "@/lib/userUtils";
import CoinDetails from "@/components/prisma/coinDetails";

export default async function GetMemecoin({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user: User | null = await getUser();
    const memecoin: Memecoin = await getMemecoin(id);
    if (!memecoin) {
        notFound();
    }

    return (
        <CoinDetails memecoin={memecoin} user={user} />
    );
}