import AddMemecoin from "@/components/memecoin/AddMemecoin";
import MemecoinList from "@/components/memecoin/MemecoinList";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function MemecoinPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }
    return (
        <>
            <MemecoinList />
            <AddMemecoin />
        </>
    );
}