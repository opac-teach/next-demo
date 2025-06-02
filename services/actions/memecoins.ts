"use server"

import { revalidatePath } from "next/cache";
import { Inputs, } from "../interfaces";

// export const fetchMemecoins = async () => {
//     try {
//         const response = await fetch("https://nuxt-demo-blush.vercel.app/api/get-memecoins", { 
//             // next: { revalidate: 5 },
//         });
//         if (response.ok){
//             const data = await response.json(); 
//             return data;
//         }
//     }
//     catch (e){
//         console.error(e)
//         throw new Error("Erreur lors de la récupération des memecoins")
//     }}


export const postMemecoin =  async (data:Inputs) => {
    try {
        const response = await fetch("https://nuxt-demo-blush.vercel.app/api/create-memecoin", {
                    headers: { "Content-Type": "application/json" },
                    method : "POST",
                    body: JSON.stringify(data)
                })
                revalidatePath('/memecoins')
        return response;
    }
    catch (e) {
        console.error(e)
        throw new Error("Erreur lors de la ccréation du memecoin")
    }
} 

// export const fetchMemecoin = async (id:string) => {
//     try{
//         const response = await fetch(`https://nuxt-demo-blush.vercel.app/api/get-memecoins/${id}`);
//         if (response.ok){
//             const data = await response.json();
//             return data
//         }
//     }
//     catch(e) {
//         console.error(e)
//         throw new Error("Erreur lors de la récupération du memecoin")
//     }
// }