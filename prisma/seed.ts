import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        name: "Alice",
        email: "alice@prisma.io",
        password: "password",
        memecoins: {
            create: [
                {
                    name: "GodCoin",
                    symbol: "GDC",
                    logoUrl: "https://picsum.photos/200",
                },
                {
                    name: "MamieCoin",
                    symbol: "MMC",
                    logoUrl: "https://picsum.photos/200",
                },
            ],
        },
    },
    {
        name: "Bob",
        email: "bob@prisma.io",
        password: "password",
        memecoins: {
            create: [
                {
                    name: "CoinCoin",
                    symbol: "CC",
                    logoUrl: "https://picsum.photos/200",
                },
            ],
        },
    },
];

export async function main() {
    for (const u of userData) {
        await prisma.user.create({ data: u });
    }
}

main();