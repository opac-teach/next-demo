'use client';

import Link from "next/link";
import {Memecoin, User} from "@/app/generated/prisma";
import {Button} from "@/components/ui/button";
import {deleteMemecoin} from "@/lib/coinUtils";
import {ArrowLeft, Coins, User as UserIcon, FileText} from "lucide-react";
import {ImageWithFallback} from "@/components/prisma/ImageWithFallbackProps";

export default function CoinDetails({memecoin, user}: { memecoin: Memecoin, user: User | null }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white dark:bg-gray-800 shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-center space-x-4">
                        <div className="relative">
                            <ImageWithFallback
                                className="w-20 h-20 rounded-full shadow-sm object-cover border-2 border-gray-100 dark:border-gray-700"
                                src={memecoin.logoUrl}
                                alt={memecoin.name}
                                width={80}
                                height={80}
                            />
                        </div>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {memecoin.name}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <Coins className="w-6 h-6 text-blue-500"/>
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-0">
                                Symbole
                            </h2>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {memecoin.symbol}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow-sm p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <UserIcon className="w-6 h-6 text-green-500"/>
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-0">
                                Créateur
                            </h2>
                        </div>
                        <p className="text-xl text-gray-900 dark:text-white">
                            {memecoin.author.name}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow-sm p-6 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <FileText className="w-6 h-6 text-purple-500"/>
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-0">
                                Description
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {memecoin.description || "Aucune description disponible."}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/prisma/coins"
                        className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2"/>
                        Retour
                    </Link>

                    {memecoin.author.id === user?.id && (
                        <Button
                            variant="destructive"
                            className="px-6 py-3 shadow-sm"
                            onClick={() => deleteMemecoin(memecoin.id)}
                        >
                            Supprimer
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}