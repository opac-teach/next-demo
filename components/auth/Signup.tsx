"use client"

import { SignupType } from "@/services/interfaces";
// import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";



const Signup: React.FC = () => {
    // const router = useRouter();

        const {
            register,
            handleSubmit,
            // watch,
            formState: { errors },
        } = useForm<SignupType>()

        const onSubmit: SubmitHandler<SignupType> = async (data) => {
            console.log(data);

            // const response = await postAccount(data)

            // if (response.ok){
            //     alert("Compte créé")
            //     router.refresh();
            // }
            // else {
            //     alert("Une erreur est survenue")
            // }
            
        }

    return (

            <div className=" flex flex-col gap-20 items-center ">
                <span className="text-center">Créer un compte</span>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 rounded-lg p-6 flex flex-col align-center gap-4 w-lg shadow-md">

                    <input placeholder="Email" type="email" {...register("email", { required: true, minLength:4, maxLength: 25 })} className="border p-1 border-black rounded-sm "/>
                    {errors.email && <span>{errors.email?.message}</span>}

                    <input placeholder="Pseudo" {...register("pseudo", { required: true, minLength:4, maxLength: 25 })} className="border p-1 border-black rounded-sm "/>
                    {errors.pseudo && <span>{errors.pseudo?.message}</span>}

                    <input placeholder="password" type="password" {...register("password", { required: true, minLength:6, maxLength: 40, })} className="border p-1 border-black rounded-sm"/>
                    {errors.password && <span>{errors.password?.message}</span>}

                    <input type="submit" className="rounded-lg shadow-md bg-white "/>
                </form>

            </div>
       
    )
}

export default Signup; 