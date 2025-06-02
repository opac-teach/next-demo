import { prisma } from "@/lib/prisma";


export const getTokenHoldingById = async (id: string) => {
    try {
        const tokenHolding = await prisma.tokenHolding.findUnique({
            where: { id },
            include: {
                user: true,
                memecoin: true,
            },
        });

        if (!tokenHolding) {
            throw new Error("Token holding not found");
        }

        return tokenHolding;
    } catch (error) {
        console.error("Error fetching token holding:", error);
        throw error;
    }
};


export const getAllTokenHoldings = async () => {
    try {
        const tokenHoldings = await prisma.tokenHolding.findMany({
            include: {
                user: true,
                memecoin: true,
            },
        });

        return tokenHoldings;
    } catch (error) {
        console.error("Error fetching token holdings:", error);
        throw error;
    }
};


export const createTokenHolding = async (data: {
    userId: string;
    memecoinId: string;
    amount: number;
}) => {
    try {
        const tokenHolding = await prisma.tokenHolding.create({
            data: {
                userId: data.userId,
                memecoinId: data.memecoinId,
                amount: data.amount,
            },
        });

        return tokenHolding;
    } catch (error) {
        console.error("Error creating token holding:", error);
        throw error;
    }
};


export const updateTokenHoldingById = async (id: string, data: {
    userId?: string;
    memecoinId?: string;
    amount?: number;
}) => {
    try {
        const tokenHolding = await prisma.tokenHolding.update({
            where: { id },
            data,
        });

        return tokenHolding;
    } catch (error) {
        console.error("Error updating token holding:", error);
        throw error;
    }
};


export const deleteTokenHoldingById = async (id: string) => {
    try {
        const tokenHolding = await prisma.tokenHolding.delete({
            where: { id },
        });

        return tokenHolding;
    } catch (error) {
        console.error("Error deleting token holding:", error);
        throw error;
    }
}


