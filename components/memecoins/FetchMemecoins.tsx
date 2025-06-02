const fetchData = async () => {
    try {
        const response = await fetch("https://nuxt-demo-blush.vercel.app/api/get-memecoins");
        const data = await response.json();
        return data
    } catch(e) {
        console.error("Erreur pendant la récupération des données", e)
    }
}

export default fetchData;