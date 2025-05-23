
import { Memecoin } from "@/lib/Memecoin";
import {MemecoinItem} from "@/components/memecoins/MemecoinItem";
import {getMemecoins} from "@/lib/actions";

export const revalidate = 10;

export async function MemecoinList() {

    const memecoins: Array<Memecoin> = await getMemecoins();

    return (
        <div>
            {memecoins && memecoins.map((coin: Memecoin) => (
                <MemecoinItem params={coin} key={coin.id} />
            ))}
        </div>
    );
}