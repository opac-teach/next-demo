import { prisma } from './prisma';

export async function getMemecoins() {
  return await prisma.memecoin.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getMemecoin(id: string) {
  return await prisma.memecoin.findUnique({
    where: { id },
  });
}