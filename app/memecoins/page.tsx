import { Suspense } from "react";
import MemecoinsSection from "@/components/memecoins/memecoins-section";
import MemecoinsSkeleton from "@/components/memecoins/memecoins-skeleton";

export const metadata = {
   title: "Memecoins | NextJS Demo App",
   description: "Liste des memecoins populaires",
};

export default function MemecoinsPage() {
   return (
      <div className="container mx-auto py-8">
         <h1 className="text-3xl font-bold mb-6">Memecoins</h1>
         <Suspense fallback={<MemecoinsSkeleton />}>
            <MemecoinsSection />
         </Suspense>
      </div>
   );
}