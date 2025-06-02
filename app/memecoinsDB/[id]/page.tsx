"use client";

import { useState, useEffect, useCallback, use } from 'react';
import { Memecoin } from '@/lib/type';
import Link from 'next/link';

const MemecoinsPageId = ({ params }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [memecoin, setMemecoin] = useState<Memecoin | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getMemecoin = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/memecoins/${id}`);

            if (!response.ok || response.status !== 200) {
                setMemecoin(null);
                throw new Error("Failed to fetch memecoin");
            }

            const data = await response.json();

            if (data && typeof data === "object") {
                setMemecoin(data);
            } else {
                console.error("Unexpected data format:", data);
                setMemecoin(null);
            }

        } catch (error) {
            console.error("Error fetching memecoin:", error);
            setMemecoin(null);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        getMemecoin();
    }, [getMemecoin]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading memecoin details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100">
            {/* Header avec bouton retour */}
            <div className="backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/memecoinsDB"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 shadow-sm"
                            >
                                <span className="mr-2">←</span>
                                Back to Database
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                            >
                                <span className="mr-2">🏠</span>
                                Home
                            </Link>
                        </div>
                        {memecoin && (
                            <div className="flex items-center space-x-2">
                                <span className="text-indigo-600 text-lg">💎</span>
                                <span className="text-sm font-medium text-gray-600">
                                    Token Details
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {memecoin ? (
                    <>
                        {/* En-tête du token */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden mb-8">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-12 text-white relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h1 className="text-4xl font-bold mb-2">{memecoin.name}</h1>
                                            <div className="flex items-center space-x-4">
                                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                                                    {memecoin.symbol}
                                                </span>
                                                <span className="text-white/80 text-sm">
                                                    Created: {new Date(memecoin.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-6xl opacity-20">🚀</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contenu principal */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Informations générales */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                                <div className="flex items-center mb-4">
                                    <span className="text-2xl mr-3">📋</span>
                                    <h2 className="text-xl font-semibold text-gray-900">Token Information</h2>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
                                        <p className="text-gray-800 leading-relaxed">
                                            {memecoin.description || 'No description available for this token.'}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 mb-1">Creator ID</p>
                                            <p className="text-gray-800 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                                {memecoin.creatorId.slice(0, 8)}...
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 mb-1">Token ID</p>
                                            <p className="text-gray-800 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                                {memecoin.id.slice(0, 8)}...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Statistiques */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                                <div className="flex items-center mb-4">
                                    <span className="text-2xl mr-3">📊</span>
                                    <h2 className="text-xl font-semibold text-gray-900">Token Statistics</h2>
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-green-800">Total Supply</p>
                                                <p className="text-2xl font-bold text-green-900">
                                                    {memecoin.totalSupply.toLocaleString()}
                                                </p>
                                            </div>
                                            <span className="text-3xl text-green-600">💰</span>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-blue-800">Reserve ZTH</p>
                                                <p className="text-2xl font-bold text-blue-900">
                                                    {memecoin.reserveZth.toLocaleString()}
                                                </p>
                                            </div>
                                            <span className="text-3xl text-blue-600">🏦</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Token Actions</h3>
                                    <p className="text-gray-600 text-sm">Manage your interaction with this token</p>
                                </div>
                                <div className="flex space-x-3">
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
                                        🛒 Buy
                                    </button>
                                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium">
                                        💸 Sell
                                    </button>
                                    <button
                                        onClick={getMemecoin}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                                    >
                                        🔄 Refresh
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    /* État d'erreur */
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl text-red-500">❌</span>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Memecoin Not Found</h3>
                        <p className="text-gray-600 mb-6">The requested memecoin could not be found in our database.</p>
                        <Link
                            href="/memecoinsDB"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                        >
                            <span className="mr-2">🔍</span>
                            Browse All Tokens
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MemecoinsPageId;