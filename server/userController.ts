import { prisma } from "@/lib/prisma";


export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                memecoin: true, // Include related memecoins
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}


export const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            include: {
                memecoin: true, // Include related memecoins
            },
        });

        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}


export const createUser = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password, // Ensure to hash the password before storing it
            },
        });

        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}


export const updateUser = async (id: string, data: {
    name?: string;
    email?: string;
    password?: string; // Ensure to hash the password before updating it
}) => {
    try {
        const user = await prisma.user.update({
            where: { id },
            data,
        });

        return user;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}


export const deleteUser = async (id: string) => {
    try {
        const user = await prisma.user.delete({
            where: { id },
        });

        return user;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}


export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                memecoin: true, // Include related memecoins
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }
}


export const getUserByName = async (name: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: { name },
            include: {
                memecoin: true, // Include related memecoins
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        console.error("Error fetching user by name:", error);
        throw error;
    }
}