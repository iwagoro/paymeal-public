import { NextResponse } from "next/server";
export async function GET(): Promise<NextResponse> {
    const res = await fetch("http://localhost:8000/", { cache: "no-store" });
    const data = await res.json();

    return NextResponse.json({ data });
}
