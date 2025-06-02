
import MemecoinItem from "@/components/memecoins/MemecoinItem";
import { fetchMemecoin } from "@/services/api/memecoins";
import { Metadata } from "next";
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>;
}


export async function generateMetadata(
  { params }: Props,
//   parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params
 
  const memecoin = await fetchMemecoin(id)
 
//   const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: memecoin.name,
    description: memecoin.description,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}

const MemecoinPage = async ({ params }: Props) => {

    const {id} = await params
    const memecoin = await fetchMemecoin(id);

    if (!memecoin){
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