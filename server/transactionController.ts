import { prisma } from "@/lib/prisma";
import { TransactionType } from "@prisma/client";

export const getTransactionById = async (id: string) => {
    try {
        const transaction = await prisma.transaction.findUnique({
            where: { id },
            include: {
                user: true, // Include related user
                memecoin: true, // Include related memecoin
            },
        });

        if (!transaction) {
            throw new Error("Transaction not found");
        }

        return transaction;
    } catch (error) {
        console.error("Error fetching transaction:", error);
        throw error;
    }
}


export const getAllTransactions = async () => {
    try {
        const transactions = await prisma.transaction.findMany({
            include: {
                user: true, // Include related user
                memecoin: true, // Include related memecoin
            },
        });

        return transactions;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};


export const createTransaction = async (data: {
    userId: string;
    memecoinId: string;
    amount: number;
    zthAmount: number;
    pricePerToken: number;
    type: TransactionType;
}) => {
    try {
        const transaction = await prisma.transaction.create({
            data: {
                userId: data.userId,
                memecoinId: data.memecoinId,
                amount: data.amount,
                zthAmount: data.zthAmount,
                pricePerToken: data.pricePerToken,
                type: data.type,
            },
        });

        return transaction;
    } catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
    }
};


export const updateTransaction = async (id: string, data: {
    amount?: number;
    zthAmount?: number;
    pricePerToken?: number;
    type?: TransactionType;
}) => {
    try {
        const transaction = await prisma.transaction.update({
            where: { id },
            data: {
                amount: data.amount,
                zthAmount: data.zthAmount,
                pricePerToken: data.pricePerToken,
                type: data.type,
            },
        });

        return transaction;
    } catch (error) {
        console.error("Error updating transaction:", error);
        throw error;
    }
};


export const deleteTransaction = async (id: string) => {
    try {
        const transaction = await prisma.transaction.delete({
            where: { id },
        });

        return transaction;
    } catch (error) {
        console.error("Error deleting transaction:", error);
        throw error;
    }
};