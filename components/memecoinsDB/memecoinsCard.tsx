"use client";

import { Memecoin } from "@/lib/type";
import { useRouter } from "next/navigation";

interface MemecoinsCardProps {
    memecoin: Memecoin;
}

export const MemecoinsCard = ({ memecoin }: MemecoinsCardProps) => {
    const router = useRouter();
    return (
        <li className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer" onClick={() => { router.push(`/memecoinsDB/${memecoin.id}`) }}>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">{memecoin.name}</h3>
                <span className="bg-white/20 px-2 py-1 rounded text-white text-sm font-medium">{memecoin.symbol}</span>
            </div>

            <div className="p-5">
                <p className="text-gray-600 mb-5 line-clamp-3">{memecoin.description || 'No description available'}</p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Total Supply</p>
                        <p className="font-semibold text-gray-800">{memecoin.totalSupply.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Reserve</p>
                        <p className="font-semibold text-gray-800">{memecoin.reserveZth.toLocaleString()} ZTH</p>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                    <span className="text-xs text-gray-400">
                        Created: {new Date(memecoin.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </li>
    );
};

export default MemecoinsCard;