import prisma from "@/lib/prisma";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id: string = searchParams.get('id') as string;
    const memecoin = await prisma.memecoin.findUnique({
        where: {id: parseInt(id)},
        include: {
            author: true,
        },
    });

    return Response.json(memecoin);
}