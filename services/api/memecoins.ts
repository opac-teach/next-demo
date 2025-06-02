
export const fetchMemecoins = async () => {
    try {
        const response = await fetch("https://nuxt-demo-blush.vercel.app/api/get-memecoins"
                // ,{next: { revalidate: 5}}
        );
        if (response.ok){
            const data = await response.json(); 
            return data;
        }
    }
    catch (e){
        console.error(e)
        throw new Error("Erreur lors de la récupération des memecoins")
    }
}

export const fetchMemecoin = async (id:string) => {
     try{
            const response = await fetch(`https://nuxt-demo-blush.vercel.app/api/get-memecoins/${id}`
            );
            if (response.ok){
                const data = await response.json();
                return data;
            } 
        }
        catch(e) {
            console.error(e)
            throw new Error("Erreur lors de la récupération du memecoin")
        }
}