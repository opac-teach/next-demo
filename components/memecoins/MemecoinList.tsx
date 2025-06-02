"use client"

import { Memecoin } from "@/app/service/interfaces"
import MemecoinItem from "./MemecoinItem"
import { useState, useEffect } from "react"
import fetchData from "./FetchMemecoins"

interface MemecoinProps {
    memecoins: Memecoin[]
}

const MemecoinList: React.FC<MemecoinProps> = ({ memecoins }) => {

    const [refreshedMemecoins, setRefreshedMemecoins] = useState<Memecoin[]>(memecoins)

    useEffect(() => {
        const refreshData = async () => {
            try {
                fetchData().then((data) => {
                    console.log(data)
                    if(!data.error) {
                        setRefreshedMemecoins(data)
                    }
                })
            } catch(e) {
                console.error("Erreur lors du rafraichissement des données", e)
            }
        }

        refreshData();

        const interval = setInterval(refreshData, 5000)

        return () => clearInterval(interval);
    }, []);

    return  (
        <ul className="list-none grid grid-cols-4 gap-4">
            {refreshedMemecoins.map((memecoin) => (
                <li key={memecoin.id} className="bg-gray-100 rounded-lg p-6 w-md">
                    <MemecoinItem memecoin={memecoin} />
                </li>
            ))}
        </ul>
    )

}

export default MemecoinList;

