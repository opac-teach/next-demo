import { getMemecoinById } from "@/server/memecoinController";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const memecoin = await getMemecoinById(id);
        if (!memecoin) {
            return new Response("Memecoin not found", { status: 404 });
        }
        return new Response(JSON.stringify(memecoin), {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching memecoin:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}