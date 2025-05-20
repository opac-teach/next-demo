'use client';

import Storage from '@/components/memecoins/alternative/Storage/Storage';

export default function MemecoinStoragePage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Utilisation du localStorage</h1>
            <Storage
                storageKey="userPreference"
                label="Préférences utilisateur :"
                placeholder="Entrez votre préférence"
            />
        </div>
    );
}