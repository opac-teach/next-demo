"use server";

import {cache} from "react";
import {revalidatePath} from "next/cache";
import path from "path";
import {promises as fs} from "fs";
import {Memecoin} from "@/lib/Memecoin";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPrivateSecret() {
    return process.env.SECRET;
}


export async function getDate() {
    // no-store here tells next that the response should not be cached and called on every request
    // Without it, it is fetched once at build time and never again
    const data = await fetch(`${API_URL}/api/time`, {cache: "no-store"});
    const {time} = await data.json();
    const date = new Date(time);
    await delay(1000);
    return date;
}

const posts = [
    {id: 1, title: "First Post", content: "This is the first post"},
    {id: 2, title: "Second Post", content: "This is the second post"},
];

export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    posts.push({id: posts.length + 1, title, content});
    revalidatePath("/posts");
}

export async function getPosts() {
    await delay(1000);
    return posts;
}

export async function getMemecoins(): Promise<Array<Memecoin>> {
    const response = await fetch("https://nuxt-demo-blush.vercel.app/api/get-memecoins");
    return await response.json();
}

function randomString() {
    return Math.random().toString(36).substring(2, 10);
}


export async function createMemecoin(prevState: never, formData: FormData) {
    const name = formData.get("name") as string;
    const symbol = formData.get("symbol") as string;
    const description = formData.get("description") as string;
    const logoUrl = formData.get("logo") as string;
    const memecoin: Memecoin = {
        owner: "me",
        id: randomString(),
        name,
        symbol,
        description,
        logoUrl,
    };
    try {
        const response = await fetch("https://nuxt-demo-blush.vercel.app/api/create-memecoin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(memecoin),
        });
        revalidatePath("/memecoins");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating memecoin", error);
        return error;
    }
}

export const getMemecoin = cache(async (id: string) => {
    try {
        const response = await fetch(`https://nuxt-demo-blush.vercel.app/api/get-memecoins/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching memecoin", error);
        return null;
    }
});

// Cache the action to avoid re-fetching the same post in same request
export const getPost = cache(async (id: string) => {
    return posts.find((post) => post.id === parseInt(id));
});

export async function getFileContent(filePath: string): Promise<string> {
    if (process.env.NEXT_PHASE === "phase-production-build") {
        const relativePath = filePath.startsWith("/")
            ? filePath.slice(1)
            : filePath;
        const absolutePath = path.join(process.cwd(), relativePath);
        const content = await fs.readFile(absolutePath, "utf-8");
        return content;
    }
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/code?filePath=${filePath}`,
        {
            cache: "force-cache",
        }
    );
    const {content} = await response.json();
    return content;
}
