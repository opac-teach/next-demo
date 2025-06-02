import DetailedMemecoin from "@/components/memecoin/DetailedMemecoin";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MemecoinPage({ params }: { params: { id: string } }) {
    return (
        <>
            <Link href="/memecoins">
                <Button variant="outline">← Retour à la liste</Button>
            </Link>
            <DetailedMemecoin id={params.id} />
        </>
    );
}