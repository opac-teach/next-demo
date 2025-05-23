
import {Suspense} from "react";
import {MemecoinList} from "@/components/memecoins/MemecoinList";
import {Skeleton} from "@/components/ui/skeleton";
import MemecoinForm from "@/components/memecoins/MemecoinForm";

export default function Page() {
    return (
        <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col items-center justify-start w-full">
                <h1 className="text-center">Memecoins</h1>
                <Suspense fallback={<div><Skeleton className="h-[150px] w-100 mb-4"/><Skeleton className="h-[150px] w-100 mb-4"/><Skeleton className="h-[150px] w-100"/></div>}>
                    <MemecoinList/>
                </Suspense>
            </div>
            <MemecoinForm />
        </div>
    );
}
