// components/prisma/CoinDetailsSkeleton.tsx
export function CoinDetailsSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white dark:bg-gray-800 shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-center space-x-4">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full shadow-sm border-2 border-gray-100 dark:border-gray-700 bg-gray-200 animate-pulse" />
                        </div>
                        <div className="text-center">
                            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
                        </div>
                        <div className="h-8 bg-gray-200 rounded w-20 animate-pulse" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow-sm p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
                        </div>
                        <div className="h-7 bg-gray-200 rounded w-32 animate-pulse" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow-sm p-6 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
                    <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
                </div>
            </div>
        </div>
    );
}