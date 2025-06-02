// "use client";

// import { useEffect, useState } from "react";
// import {Memecoin} from "@/services/interfaces"

// const MemecoinsPage = () => {
//     const [memecoins, setMemecoins] = useState<Memecoin[]>([]); 

//     const fetchData = async () => {
//        try {
//          const response = await fetch("https://nuxt-demo-blush.vercel.app/api/get-memecoins");
//             if (response.ok){
//                 const data = await response.json(); 
//                 setMemecoins(data);
//             }
//        }
//        catch (e){
//         console.error(e)
//        }

//         // return data;
//     };

//   useEffect(() => {
//         fetchData();

//         const timeout = setInterval(() => {
//             fetchData();

//         }, 5000);

//         return () => {
//             clearInterval(timeout)
//         }
//     }, [])

//     return (
//         <div>
//             <MemecoinsList memecoins={memecoins}/>
//             <CreateMemecoin memecoinCreated={()=> fetchData()}/>
//         </div>
//     );
// };

// export default MemecoinsPage;


import { fetchMemecoins } from "@/services/api/memecoins";
import CreateMemecoin from "@/components/memecoins/CreateMemecoin";
import MemecoinsList from "../../components/memecoins/MemecoinList"
import { Metadata} from "next";
import { Skeleton } from "@/components/ui/skeleton";
import MemecoinListRSC from "@/components/memecoins/MemecoinListRSC";
import MemecoinsListSSG from "@/components/memecoins/MemecoinListSSG";
import MemecoinsListISR from "@/components/memecoins/MemecoinListISR";

export const metadata: Metadata = {
  title: "Memecoins ",
  description:
    "Consultez la liste des memecoins.",
};

const MemecoinsPage = async () => {

  const initialMemecoins = await fetchMemecoins();

  return (
    <div>
      {
        initialMemecoins ? (
            <div>
              {/* CSR */}
                <MemecoinsList memecoins={initialMemecoins}/>
                <CreateMemecoin />

                <div>
                  <span className="text-xl font-bold">Memecoin version rsc</span>
                  <MemecoinListRSC />
                </div>
                <div>
                  <MemecoinsListSSG/>
                </div>
                <div>
                    <MemecoinsListISR/>
                </div>
            </div>
        ) : (
            <Skeleton/>
        )
      }
    </div>
  );
};

export default MemecoinsPage;