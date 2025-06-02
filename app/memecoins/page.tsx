import MemecoinList from "@/components/memecoins/MemecoinList";
import MemecoinForm from "@/components/memecoins/MemecoinForm";
import fetchData from "@/components/memecoins/FetchMemecoins";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Memecoins",
    description: "Consultez la liste des memecoins"
}

const MemecoinsPage = async () => {

    const memecoins = await fetchData();

    return (
        <div>
            <MemecoinList memecoins={memecoins} />
            <MemecoinForm memecoins={memecoins}/>
        </div>
    )
}

export default MemecoinsPage;