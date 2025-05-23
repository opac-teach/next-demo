import prisma from "@/lib/prisma";
import {Memecoin} from "@/app/generated/prisma";

export async function POST(request: Request){
    const body: Memecoin = await request.json();
    if (!body) {
        return Response.json({message: "No body"});
    }
    const memecoin = await prisma.memecoin.create({
        data: {
            name: body.name,
            symbol: body.symbol,
            description: body?.description,
            logoUrl: body?.logoUrl,
            authorId: body.authorId,
        },
    });
    return Response.json(memecoin);
}