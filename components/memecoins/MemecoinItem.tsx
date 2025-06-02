import { Memecoin } from "@/services/interfaces";

interface MemecoinProps {
    memecoin: Memecoin;
}

const MemecoinItem:React.FC<MemecoinProps> = ({memecoin}) => {

    return (
        <div className="bg-gray-100 rounded-lg p-3 shadow-md h-full">
            <p>Nom: {memecoin.name}</p>
            <p>Symbole: {memecoin.symbol}</p>
            <p>Proprio: {memecoin.owner}</p>
            <p>Description: {memecoin.description}</p>
            <img src={memecoin.logoUrl} alt={`img of ${memecoin.name}`} />
        </div>
    )
}

export default MemecoinItem