"use client";

import { useEffect, useState, useCallback } from "react";
import { MemecoinsCard } from "@/components/memecoinsDB/memecoinsCard";
import { Memecoin } from "@/lib/type";
import Link from "next/link";

export default function Page() {
    const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMemecoins = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/memecoins');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMemecoins(data);
        } catch (error) {
            console.error('Error fetching memecoins:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMemecoins();
    }, [fetchMemecoins]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading memecoins...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100">
            {/* Contenu principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 shadow-sm"
                        >
                            <span className="mr-2">←</span>
                            Back to Home
                        </Link>
                        <div className="flex items-center space-x-2">
                            <span className="text-indigo-600 text-lg">✨</span>
                            <span className="text-sm font-medium text-gray-600">
                                {memecoins.length} tokens available
                            </span>
                        </div>
                    </div>
                </div>
                {/* En-tête de la page */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
                        <span className="text-2xl text-indigo-600">🗄️</span>
                    </div>
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Memecoins Database
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Discover and explore the latest memecoins in our comprehensive database.
                        Track performance, analyze trends, and find your next investment opportunity.
                    </p>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <span className="text-xl text-green-600">📊</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Tokens</p>
                                <p className="text-2xl font-bold text-gray-900">{memecoins.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <span className="text-xl text-blue-600">🔥</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Active Markets</p>
                                <p className="text-2xl font-bold text-gray-900">{memecoins.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <span className="text-xl text-purple-600">🚀</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">New Today</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {memecoins.filter(coin => {
                                        const today = new Date();
                                        const coinDate = new Date(coin.createdAt);
                                        return coinDate.toDateString() === today.toDateString();
                                    }).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Liste des memecoins */}
                {memecoins.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {memecoins.map((memecoin) => (
                            <MemecoinsCard key={memecoin.id} memecoin={memecoin} />
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl text-gray-400">💾</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No memecoins found</h3>
                        <p className="text-gray-600">There are currently no memecoins in the database.</p>
                    </div>
                )}
            </div>

            {/* Footer avec action */}
            <div className="bg-white/60 backdrop-blur-sm border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <button
                            onClick={fetchMemecoins}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            <span className="mr-2">🔄</span>
                            Refresh Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}