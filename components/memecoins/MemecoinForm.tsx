"use client"

import { Memecoin } from "@/app/service/interfaces"
import { useForm, SubmitHandler} from "react-hook-form"
import fetchData from "./FetchMemecoins"
import { useState } from "react"

type Inputs = {
    nom: string,
    symbole: string,
    description: string,
    logoUrl:  string
}

interface MemecoinProps {
    memecoins: Memecoin[]
}

const MemecoinForm: React.FC<MemecoinProps> = ({memecoins}) => {

    const [, setRefreshedMemecoins] = useState<Memecoin[]>(memecoins)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            console.log(data)
            const response = await fetch("https://nuxt-demo-blush.vercel.app/api/create-memecoin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.nom,
                    symbol: data.symbole,
                    description: data.description,
                    logoUrl: data.logoUrl
                })
            })
            if(response.ok){
                alert("Memecoin ajoutée")
                fetchData().then((data) => setRefreshedMemecoins(data))
                
            } else {
                alert("Erreur/!\\")
            }
        } catch(e) {
            console.error(e)
        }
    }

    return (
        <div className="flex flex-col gap-10 items-center">
            <span className="text-center">Créer un memecoin</span>
            <form className="bg-gray-100 rounded-lg p-6 flex flex-col align-center gap-4 w-lg" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Nom" id="nameInput" className="border border-black rounded-sm p-1" minLength={4} maxLength={16} {...register("nom", {required: true})} />
                {errors.nom && <span>Ce champ est requis</span>}
                <input type="text" placeholder="Symbole" id="symbolInput" className="border border-black rounded-sm p-1" minLength={2} maxLength={4} {...register("symbole", {required: true})} />
                {errors.symbole && <span>Ce champ est requis</span>}
                <input type="text" placeholder="Description" id="descriptionInput" className="border border-black rounded-sm p-1" maxLength={1000} {...register("description")} />
                <input type="text" placeholder="URL du Logo" id="logoUrlInput" className="border border-black rounded-sm p-1" maxLength={200} {...register("logoUrl")} />
                <input type="submit" />
            </form>
        </div>
    )
}

export default MemecoinForm;