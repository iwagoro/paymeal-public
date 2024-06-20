import { NextRequest, NextResponse } from "next/server";
import { getHandler } from "@/app/api/handler";

export async function GET(req: NextRequest) {
    return getHandler(req);
}
