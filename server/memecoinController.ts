import { prisma } from "@/lib/prisma";


export const getMemecoinById = async (id: string) => {
    try {
        const memecoin = await prisma.memecoin.findUnique({
            where: { id },
            include: {
                creator: true, // Include related user
            },
        });

        if (!memecoin) {
            throw new Error("Memecoin not found");
        }

        return memecoin;
    } catch (error) {
        console.error("Error fetching memecoin:", error);
        throw error;
    }
};


export const getAllMemecoins = async () => {
    try {
        const memecoins = await prisma.memecoin.findMany({
            include: {
                creator: true, // Include related user
            },
        });

        return memecoins;
    } catch (error) {
        console.error("Error fetching memecoins:", error);
        throw error;
    }
};


export const createMemecoin = async (data: {
    name: string;
    symbol: string;
    userId: string;
}) => {
    try {
        const memecoin = await prisma.memecoin.create({
            data: {
                name: data.name,
                symbol: data.symbol,
                creatorId: data.userId,
            },
        });

        return memecoin;
    } catch (error) {
        console.error("Error creating memecoin:", error);
        throw error;
    }
};


export const updateMemecoin = async (id: string, data: {
    name?: string;
    symbol?: string;
}) => {
    try {
        const memecoin = await prisma.memecoin.update({
            where: { id },
            data,
        });

        return memecoin;
    } catch (error) {
        console.error("Error updating memecoin:", error);
        throw error;
    }
};