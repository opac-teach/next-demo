import MemecoinItem from "@/components/memecoins/MemecoinItem";
import { Metadata } from "next";

interface DetailProps {
    params: {id: string}
}

export async function generateMetadata(
    { params, }: DetailProps,
): Promise<Metadata> {

    const { id } = await params

    const fetchData = async () => {
            const response = await fetch(`https://nuxt-demo-blush.vercel.app/api/get-memecoins/${id}`);
            const data = await response.json();
            return data
        }

    const memecoin = await fetchData()

    if (memecoin) {
        return {
            title: memecoin.name,
            description: memecoin.description,
            openGraph: {
                images: memecoin.logoUrl,
            },
        }
    } else {
        return {}
    }
}

const MemecoinDetailPage = async ({params}: DetailProps) => {

    const { id } = await params
    try {
        const fetchData = async () => {
            const response = await fetch(`https://nuxt-demo-blush.vercel.app/api/get-memecoins/${id}`);
            const data = await response.json();
            return data
        }

        const memecoin = await fetchData()
        
        return (
        <div>
            {
                (
                    <MemecoinItem memecoin={memecoin} />
                )
            }
            
        </div>
   )
    } catch(e) {
        console.error(e)
    }

    
}

export default MemecoinDetailPage;