"use client"

import { useRouter } from "next/navigation"



const Logout = () => {
    const router = useRouter();
    const logout = async () => {
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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

    logout();
}

export default Logout;