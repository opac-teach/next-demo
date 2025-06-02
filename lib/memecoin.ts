import { MemecoinType } from "@/types/memecoin";
import { checkMemecoin } from "@/lib//validators/memecoin";
import { MemecoinFieldErrorType } from "@/types/memecoinFieldError";

export async function fetchMemecoins(): Promise<MemecoinType[]> {
    const res = await fetch('https://nuxt-demo-blush.vercel.app/api/get-memecoins');
    if (!res.ok) {
        throw new Error(res.statusText || 'Failed to fetch memecoins');
    }
    return await res.json();
}

export async function fetchMemecoin(id: string): Promise<MemecoinType> {
    const response = await fetch(`https://nuxt-demo-blush.vercel.app/api/get-memecoins/${id}`);
    return response.json();
}

export async function createMemecoin(prevState: any, formData: FormData): Promise<any> {
    const name = formData.get("name") as string;
    const symbol = formData.get("symbol") as string;
    const description = formData.get("description") as string;
    const logoUrl = formData.get("logoUrl") as string;

    const errors: MemecoinFieldErrorType[] = checkMemecoin(name, symbol, description, logoUrl);

    if (errors.length > 0) {
        return { errors };
    }

    const payload = { name, symbol, description, logoUrl };

    try {
        const res = await fetch("https://nuxt-demo-blush.vercel.app/api/create-memecoin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return {
                description: errorData.message || "Failed to create memecoin.",
            };
        }

        return await res.json();
    } catch (e) {
        return {
            description: "An unexpected error occurred. Please try again later.",
        };
    }
}