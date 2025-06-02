"use client";

import { postMemecoin } from "@/services/api/memecoins";
import { Inputs } from "@/services/interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"



const CreateMemecoin: React.FC = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<Inputs>()

    const [isValid, setIsValid] = useState(true);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        if (data.name == null || data.name.length > 16 || data.name.length < 4){
            alert("Le nom n'est pas valide")
            setIsValid(false);
            return;
        }

        if (data.symbol == null || data.symbol.length < 2 || data.symbol.length > 4){
            alert("Le symbole n'est pas valide")
            setIsValid(false);
            return;
        }

        if (data.description.length > 1000){
            alert("La description n'est pas valide")
            setIsValid(false);
            return;
        }

        if (data.logoUrl.length > 200){
            alert("L'url n'est pas valide")
            setIsValid(false);
            return;
        }

        const response = await postMemecoin(data)

        if (response.ok){
            alert("Memecoin ajouté avec succès")
            router.refresh();
        }
        else {
            alert("Une erreur est survenue")
        }
        
    }

    return (

            <div className=" flex flex-col gap-20 items-center ">
                <span className="text-center">Créer un memecoin ;)</span>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 rounded-lg p-6 flex flex-col align-center gap-4 w-lg shadow-md">

                    <input placeholder="Nom" {...register("name", { required: true ,minLength:4,maxLength: 16 })} className="border p-1 border-black rounded-sm "/>
                    {errors.name && <span className="bg-red-200 border border-red-400 p-2 text-red-800 rounded-lg">Le nom doit être entre 4 et 16 caractères</span>}

                    <input placeholder="Symbole" {...register("symbol", { required: true,minLength:2,maxLength: 4,pattern: /^[A-Z]+$/ })} className="border p-1 border-black rounded-sm"/>
                    {errors.symbol && <span className="bg-red-200 border border-red-400 p-2 text-red-800 rounded-lg">Le symmbole doit être entre 2 et 4 caractères</span>}

                    <input placeholder="Description" {...register("description",{minLength:0,maxLength: 1000 })} className="border p-1 border-black rounded-sm"/>
                    {errors.description && <span className="bg-red-200 border border-red-400 p-2 text-red-800 rounded-lg">La description ne doit pas dépasser 1000 caractères</span>}

                    <input placeholder="Url du logo" {...register("logoUrl",{minLength:0,maxLength: 200, pattern: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/ })} className="border p-1 border-black rounded-sm"/>
                    {errors.logoUrl && <span className="bg-red-200 border border-red-400 p-2 text-red-800 rounded-lg">L url n ests pas valide</span>}

                    <input type="submit" className="rounded-lg shadow-md bg-white "/>
                </form>

            </div>
       
    )
}

export default CreateMemecoin;