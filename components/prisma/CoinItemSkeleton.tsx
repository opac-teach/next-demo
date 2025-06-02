// components/prisma/CoinItemSkeleton.tsx
export function CoinItemSkeleton() {
    return (
        <div className="group/item flex items-center justify-between gap-4 w-10/12 mb-4 rounded-md p-2">
            {/* Image skeleton */}
            <div className="w-11 h-11 rounded-full shadow-sm border-2 border-gray-100 dark:border-gray-700 bg-gray-200 animate-pulse" />

            {/* Coin info skeleton */}
            <div className="flex flex-col items-start justify-center w-96 gap-2">
                {/* Name skeleton */}
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
                {/* Symbol skeleton */}
                <div className="flex gap-1 items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                </div>
            </div>

            {/* Author skeleton */}
            <div className="flex gap-1 items-center ml-2 w-32">
                <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
            </div>

            {/* Button skeleton */}
            <div className="w-8 h-8 rounded bg-white ml-4" />
        </div>
    );
}