"use client"

import { useForm, SubmitHandler} from "react-hook-form"
import { useRouter } from "next/navigation"

type Inputs = {
    user: string,
    password: string
}

const Login: React.FC = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if(response.ok){
                router.refresh()
                
            } else {
                alert("Erreur/!\\")
            }
        } catch(e) {
            console.error(e)
        }
    }

    return (
        <div className="flex flex-col gap-10 items-center">
            <span className="text-center">Se connecter</span>
            <form className="bg-gray-100 rounded-lg p-6 flex flex-col align-center gap-4 w-lg" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Nom d'utilisateur" id="userInput" className="border border-black rounded-sm p-1" {...register("user", {required: true})} />
                {errors.user && <span>Ce champ est requis</span>}
                <input type="text" placeholder="Mot de passe" id="passwordInput" className="border border-black rounded-sm p-1" {...register("password", {required: true})} />
                {errors.password && <span>Ce champ est requis</span>}
                <input type="submit" className="border border-black rounded-sm p-1" />
            </form>
        </div>
    )
}

export default Login;