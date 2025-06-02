"use server";

import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";
import path from "path";
import { cache } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPrivateSecret() {
    return process.env.SECRET;
}

export async function getDate() {
    // no-store here tells next that the response should not be cached and called on every request
    // Without it, it is fetched once at build time and never again
    const data = await fetch(`${API_URL}/api/time`, { cache: "no-store" });
    const { time } = await data.json();
    const date = new Date(time);
    await delay(1000);
    return date;
}

const posts = [
    { id: 1, title: "First Post", content: "This is the first post" },
    { id: 2, title: "Second Post", content: "This is the second post" },
];

export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    posts.push({ id: posts.length + 1, title, content });
    revalidatePath("/posts");
}

export async function getPosts() {
    await delay(1000);
    return posts;
}

export async function createMemecoin(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const symbol = formData.get("symbol") as string;
    const description = formData.get("description") as string;
    const logoUrl = formData.get("logoUrl") as string;

    const errors: { field: string, description: string }[] = [];

    if (!name || name.length < 4 || name.length > 16) {
        errors.push({
            field: "name",
            description: "Name must be between 4 and 16 characters and is required."
        });
    }

    if (!symbol || symbol.length < 2 || symbol.length > 4 || !/^[A-Z]+$/.test(symbol)) {
        errors.push({
            field: "symbol",
            description: "Symbol must be between 2 and 4 uppercase characters and is required."
        });
    }

    if (description && description.length > 1000) {
        errors.push({
            field: "description",
            description: "Description must be 0 to 1000 characters."
        });
    }

    if (logoUrl && (logoUrl.length > 200 || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(logoUrl))) {
        errors.push({
            field: "logoUrl",
            description: "Logo URL must be a valid URL and up to 200 characters."
        });
    }

    if (errors.length > 0) {
        return { errors };
    }

    const payload = {
        name: name,
        symbol: symbol,
        description: description,
        logoUrl: logoUrl,
    };

    try {
        const res = await fetch("https://nuxt-demo-blush.vercel.app/api/create-memecoin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { decscription: errorData.message || "Failed to create memecoin." };
        }
        return await res.json();
    } catch (e) {
        return { decscription: "An unexpected error occurred. Please try again later." };
    }
}

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
    const { content } = await response.json();
    return content;
}
