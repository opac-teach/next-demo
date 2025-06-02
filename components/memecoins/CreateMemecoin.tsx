"use client";

import { postMemecoin } from "@/services/api/memecoins";
import { Inputs } from "@/services/interfaces";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form"



const CreateMemecoin: React.FC = () => {
    const router = useRouter();

        const {
            register,
            handleSubmit,
            // watch,
            formState: { errors },
        } = useForm<Inputs>()

        const onSubmit: SubmitHandler<Inputs> = async (data) => {
            // console.log(data);

            if(data.name == null || data.name.length < 4 || data.name.length > 16){
                alert("Le nom doit être entre 4 et 16 caractères")
                return;
            }
            if(data.symbol == null || data.symbol.length < 2 || data.symbol.length > 4){
                alert("Le symbole doit être en majuscule et entre 2 et 4 caractères")
                return;
            }
            if(data.description == null || data.description.length < 0 || data.description.length > 1000){
                alert("Le nom doit être entre 4 et 16 caractères")
                return;
            }
            if(data.logoUrl == null || data.logoUrl.length < 0 || data.logoUrl.length > 200){
                alert("L'url doit être entre 0 et 200 caractères et valide")
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

                    <input placeholder="Nom" {...register("name", { required: true, minLength:4, maxLength: 16 })} className="border p-1 border-black rounded-sm "/>
                    {errors.name && <span>Le nom doit être entre 4 et 16 caractères</span>}

                    <input placeholder="Symbole" {...register("symbol", { required: true, minLength:2, maxLength: 4, pattern: /^[A-Z]+$/ })} className="border p-1 border-black rounded-sm"/>
                    {errors.symbol && <span>Le symbole doit être en majuscule et entre 2 et 4 caractères</span>}

                    <input placeholder="Description" {...register("description",{minLength:0, maxLength: 1000 })} className="border p-1 border-black rounded-sm"/>
                    {errors.description && <span>La description doit être entre 0 et 1000 caractères</span>}

                    <input placeholder="Url du logo" {...register("logoUrl",{minLength:0, maxLength: 200, pattern: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/ })} className="border p-1 border-black rounded-sm"/>
                    {errors.logoUrl && <span>L&#39;url doit être entre 0 et 200 caractères et valide</span>}

                    <input type="submit" className="rounded-lg shadow-md bg-white "/>
                </form>

            </div>
       
    )
}

export default CreateMemecoin; 