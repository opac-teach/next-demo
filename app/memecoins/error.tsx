'use client';

import MemecoinForm from "@/components/memecoins/MemecoinForm";

export default function Error() {
    return (
        <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col items-center justify-start w-full">
                <h1 className="text-center">Memecoins</h1>
                <p>Oops... something went wrong</p>
            </div>
            <MemecoinForm />
        </div>
    );
}