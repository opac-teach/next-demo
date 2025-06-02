"use server";

import {getUser} from "@/lib/userUtils";
import {Memecoin, User} from "@/app/generated/prisma";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {headers} from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getMemecoins() {
    const response = await fetch(`${API_URL}/api/memecoins`, {cache: "no-store"});
    if (!response.ok) {
        throw new Error("Failed to fetch memecoins");
    }
    return await response.json();
}

export async function getMemecoin(id: string) {
    const response = await fetch(`${API_URL}/api/memecoins/memecoin?id=${id}`, {cache: "no-store"});
    if (!response.ok) {
        throw new Error("Failed to fetch memecoin");
    }
    return await response.json();
}

export async function createMemecoin(prevState: never, formData: FormData) {

    const user: User | null = await getUser();

    const memecoin = {
        name: formData.get("name") as string,
        symbol: formData.get("symbol") as string,
        description: formData.get("description") as string,
        logoUrl: formData.get("logoUrl") as string,
        authorId: user?.id,
    }
    const response = await fetch(`${API_URL}/api/memecoins/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(memecoin),
    });
    if (!response.ok) {
        throw new Error("Failed to create memecoin");
    }
    redirect('/prisma/coins');
}

export async function deleteMemecoin(id: number) {
    const user: User | null = await getUser();
    const memecoin: Memecoin = await getMemecoin(id.toString());

    if(user == null || user.id !== memecoin.authorId){
        throw new Error("Something went wrong");
    }
    const response = await fetch(`${API_URL}/api/memecoins/delete?id=${id}`,
        {method: "DELETE"});
    if (!response.ok) {
        throw new Error("Failed to fetch memecoin");
    }

    const headersList = await headers();
    const currentUrl = headersList.get('x-url') || headersList.get('referer');

    if (currentUrl && currentUrl.includes(`/prisma/coins/${id}`)) {
        redirect('/prisma/coins');
    } else {
        revalidatePath("/prisma/coins");
    }


}