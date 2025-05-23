import { Skeleton } from "@/components/ui/skeleton";

export default function MemecoinsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                    <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-3 w-8" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-3 w-8" />
                                <Skeleton className="h-3 w-14" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}