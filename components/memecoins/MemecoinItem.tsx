import { Memecoin } from "@/app/service/interfaces"



interface MemecoinProps {
    memecoin: Memecoin
}

const MemecoinItem: React.FC<MemecoinProps> = ({memecoin}) => {

if(memecoin.error){
            return (
                <div>
                    <span>Erreur {memecoin.statusCode} : {memecoin.message}</span>
                </div>
            )
        }

return (
        <div>
            <p>Nom: {memecoin.name}</p>
            <p>Symbole: {memecoin.symbol}</p>
            <p>Détenteur: {memecoin.owner}</p>
            <p>Description: {memecoin.description}</p>
            <img src={memecoin.logoUrl} alt="Memecoin Logo" />
        </div>
    )

}

export default MemecoinItem

    

