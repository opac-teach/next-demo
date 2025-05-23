import {getMemecoin} from "@/lib/actions";
import { ImageResponse } from "next/og";

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
    const { id } = params;

    const memecoin = await getMemecoin(id);

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    fontSize: 32,
                    fontWeight: 600,
                }}
            >
                <img src={memecoin.logoUrl}alt={memecoin.name} width={100} height={100} />
                <div style={{ marginTop: 40 }}>{memecoin.name}</div>
            </div>
        )
    );
}
