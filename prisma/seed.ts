import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    await prisma.memecoin.createMany({
        data: [
            {
                name: 'Bitcoin',
                symbol: 'BTC',
                description: 'La première crypto-monnaie.',
                logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png'
            },
            {
                name: 'Ethereum',
                symbol: 'ETH',
                description: 'La crypto-monnaie pour les contrats intelligents.',
                logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/langfr-250px-Ethereum-icon-purple.svg.png'
            }
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });