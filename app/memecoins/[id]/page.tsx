import MemecoinItem from "@/components/memecoins/MemecoinItem";
import { fetchMemecoin } from "@/services/api/memecoins";
import type { Metadata, } from 'next'
import { notFound } from "next/navigation";

type PageProps = {
    params: Promise<{ id: string }>
}

export async function generateMetadata(
    { params, }: PageProps,
    // parent: ResolvingMetadata
): Promise<Metadata> {

    const { id } = await params
    const memecoin = await fetchMemecoin(id)

    if (memecoin) {
        // optionally access and extend (rather than replace) parent metadata
        // const previousImages = (await parent).openGraph?.images || []
        return {
            title: memecoin.name,
            description: memecoin.description,
            // openGraph: {
            //     images: ['/some-specific-page-image.jpg', ...previousImages],
            // },
        }
    } else {
        return {}
    }
}

const MemecoinPage = async ({params}: PageProps) => {

    const { id } = await params
    const memecoin = await fetchMemecoin(id)

    if(!memecoin){
        console.log("NOT FOUND")
        return notFound()
    }

    return (
        <div>
            {
                memecoin && (
                    <MemecoinItem memecoin={memecoin}/>
                )
            }
        </div>
    )
}


export default MemecoinPage;