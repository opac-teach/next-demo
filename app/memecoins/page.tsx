import CreateMemecoin from "@/components/memecoins/CreateMemecoin";
import MemecoinsList from "@/components/memecoins/MemecoinList"
import { fetchMemecoins } from "@/services/api/memecoins";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Memecoins",
    description: "Consultez la liste des memecoins"
}

const MemecoinsPage = async () => {
  const initialMemecoins = await fetchMemecoins();

  return (
    <div>
        {
            initialMemecoins ? (
                <>
                    <MemecoinsList memecoins={initialMemecoins}/>
                    <CreateMemecoin />
                </>
            ) : (
                <span>...</span>
            )
        }
    </div>
  );
};

export default MemecoinsPage; 