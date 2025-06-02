"use client";

import { fetchMemecoins } from "@/services/api/memecoins";
import MemecoinItem from "./MemecoinItem";
import {Memecoin} from "@/services/interfaces"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface MemecoinProps {
    memecoins: Memecoin[]
}

const MemecoinList: React.FC<MemecoinProps> = ({memecoins}) => {

    const [refreshedMemecoins, setRefreshedMemecoins] = useState<Memecoin[]>(memecoins)

    useEffect(() => {

        const refreshData = async () => {
        try {
            const newData = await fetchMemecoins();
            if(newData){
                setRefreshedMemecoins(newData);
            }
        } catch (e) {
            console.error("Erreur lors du refresh des memecoins", e);
        }
        };

        refreshData();

        const interval = setInterval(refreshData, 5000);

        return () => clearInterval(interval);
    }, []);

    const router = useRouter();

    return (
       <div>
        { 
            memecoins ? (
                <ul className="grid grid-cols-4 gap-4 list-none">
                    {refreshedMemecoins.map((memecoin) => (
                        <li key={memecoin.id} className="" onClick={()=> router.push(`/memecoins/${memecoin.id}`)}>
                            <MemecoinItem memecoin={memecoin} />
                        </li>
                    ))}
                    </ul>
            ) : (
                <span>Loading</span>
            )
        }
       </div>

)
}

export default MemecoinList;