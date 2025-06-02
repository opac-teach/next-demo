'use client'

import { InputsLogin } from "@/services/interfaces";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form"


export const LoginForm = () => {

    const router = useRouter();
    
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<InputsLogin>()

    const onSubmit: SubmitHandler<InputsLogin> = async (data) => {
        const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        });

        if (response.ok){
            alert("Vous etes connecté")
            router.refresh();
        }
        else {
            alert("Une erreur est survenue")
        }
    }

    return (
        <div className=" flex flex-col gap-5 items-center ">
            <span className="text-center text-xl">Connexion</span>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 rounded-lg p-6 flex flex-col align-center gap-4 w-lg shadow-md">

                <input placeholder="Pseudo" {...register("pseudo", { required: true ,minLength:4,maxLength: 16 })} className="border p-1 border-black rounded-sm "/>
                {errors.pseudo && <span className="bg-red-200 border border-red-400 p-2 text-red-800 rounded-lg">Le pseudo doit etre entre 4 et 16 caracteres</span>}

                <input type="password" placeholder="Mot de passe" {...register("password", { required: true,minLength:8,maxLength: 20,pattern: /^[A-Za-z0-9]+$/ })} className="border p-1 border-black rounded-sm"/>
                {errors.password && <span className="bg-red-200 border border-red-400 p-2 text-red-800 rounded-lg">Le mot de passe doit etre entre 8 et 20 caracteres</span>}

                <input type="submit" className="rounded-lg shadow-md bg-white hover:bg-gray-100 p-2 "/>
            </form>

        </div>
    )

}