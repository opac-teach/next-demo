"use client"

import { LoginType } from "@/services/interfaces";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";



const Login: React.FC = () => {
    const router = useRouter();

        const {
            register,
            handleSubmit,
            // watch,
            formState: { errors },
        } = useForm<LoginType>()

        const onSubmit: SubmitHandler<LoginType> = async (data) => {
            // console.log(data);

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

            if (response.ok){
                alert("Vous êtes connectés")
                router.refresh();
            }
            else {
                alert("Une erreur est survenue")
            }
            
        }

    return (

            <div className=" flex flex-col gap-20 items-center ">
                <span className="text-center">Se connecter</span>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 rounded-lg p-6 flex flex-col align-center gap-4 w-lg shadow-md">

                    <input placeholder="Pseudo" {...register("pseudo", { required: true, minLength:4, maxLength: 25 })} className="border p-1 border-black rounded-sm "/>
                    {errors.pseudo && <span>{errors.pseudo?.message}</span>}

                    <input placeholder="password" type="password" {...register("password", { required: true, minLength:6, maxLength: 40, })} className="border p-1 border-black rounded-sm"/>
                    {errors.password && <span>{errors.password?.message}</span>}

                    <input type="submit" className="rounded-lg shadow-md bg-white "/>
                </form>

                {/* <div className="gap-2 bg-red-100 rounded-lg p-6 flex flex-col align-center gap-4 w-xs shadow-md">
                    <p className="text-center">Pas de compte ?</p>
                    <button className="rounded-lg shadow-md bg-white" onClick={()=> router.push(`/signup`)}>Créer un compte</button>
                </div> */}

            </div>
       
    )
}

export default Login; 