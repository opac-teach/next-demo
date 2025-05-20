import { NextResponse } from 'next/server';

const memecoins = [
    {
        id: '1',
        name: 'DogeCoin',
        symbol: 'DOGE',
        description: 'La monnaie préférée de l\'internet.',
        logoUrl: 'https://res.cloudinary.com/votre-cloud-name/image/upload/vxxx/dogecoin-doge-logo.png',
    },
    {
        id: '2',
        name: 'Shiba Inu',
        symbol: 'SHIB',
        description: 'Un memecoin basé sur le célèbre chien Shiba Inu.',
        logoUrl: 'https://res.cloudinary.com/votre-cloud-name/image/upload/vxxx/shiba-inu-shib-logo.png',
    },
    {
        id: '3',
        name: 'PepeCoin',
        symbol: 'PEPE',
        description: 'Inspiré par le célèbre mème Pepe the Frog.',
        logoUrl: 'https://res.cloudinary.com/votre-cloud-name/image/upload/vxxx/pepecoin-pepe-logo.png',
    },
];

// Gestionnaire GET pour la route `/api/get-memecoins`
export async function GET() {
    return NextResponse.json(memecoins);
}