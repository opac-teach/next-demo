import prisma from "@/lib/prisma";
import {NextRequest} from "next/server";
import {Memecoin} from "@/app/generated/prisma";

export async function DELETE(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id: string = searchParams.get('id') as string;
    const deleteMemecoin: Memecoin = await prisma.memecoin.delete({
        where: {
            id: parseInt(id),
        },
    });
    if (!deleteMemecoin){
        throw new Error("Failed to delete memecoin");
    }

    return Response.json('ok');
}