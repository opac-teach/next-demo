import { getAllMemecoins } from "@/server/memecoinController";

export async function GET() {
    try {
        const memecoins = await getAllMemecoins();
        return new Response(JSON.stringify(memecoins), {
            status: 200,
        });
        
    } catch (error) {
        console.error("Error fetching memecoins:", error);
        return new Response("Internal Server Error", { status: 500 });
        
    }
}