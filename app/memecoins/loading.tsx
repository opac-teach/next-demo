import MemecoinsSkeleton from "@/components/memecoins/memecoins-skeleton";

export default function Loading() {
   return (
      <div className="container mx-auto py-8">
         <h1 className="text-3xl font-bold mb-6">Memecoins</h1>
         <MemecoinsSkeleton />
      </div>
   );
}