import {Memecoin} from "@/services/interfaces"


interface MemecoinProps {
    memecoin: Memecoin
}

const MemecoinItem:React.FC<MemecoinProps> = ({memecoin}) => {


    return (

        <div className="bg-gray-100 rounded-lg p-6 shadow-md h-full">
            <p className="text-lg font-semibold text-center">{memecoin.name}</p>
            <p>Symbole : {memecoin.symbol}</p>
            <p>Propriétaire : {memecoin.owner}</p>
            <p>Description : {memecoin.description}</p>
            <img src={memecoin.logoUrl} alt={`logo de ${memecoin.name}`} />
        </div>
    )
}

export default MemecoinItem;