"use client"

import { useRouter } from "next/navigation";



const Logout: React.FC = () => {
    const router = useRouter();

    const logout = async () => {
        const response = await fetch('/api/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
            })

            if (response.ok){
                alert("Vous êtes déconnectés")
                router.refresh();
            }
            else {
                alert("Une erreur est survenue")
            }
    }

  return (
    <div className="gap-4 bg-red-100 rounded-lg p-6 flex flex-col justify-self-center align-center gap-4 w-xs shadow-md">
        <button className="rounded-lg shadow-md bg-white" onClick={logout} >Se deconnecter</button>
    </div>
  );
};

export default Logout; 