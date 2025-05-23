import prisma from "@/lib/prisma";

export async function GET(){
    const memecoins = await prisma.memecoin.findMany({
        include: {
            author: true,
        },
    });
    return Response.json(memecoins);
}

