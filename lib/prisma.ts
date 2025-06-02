import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

const globalForPrisma = global as typeof global & { prisma?: typeof prisma };

const prismaInstance = globalForPrisma.prisma || prisma;

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prismaInstance;
}

export default prismaInstance;