// app/api/user/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getHandler, postHandler } from "@/app/api/handler";

export async function GET(req: NextRequest) {
    return getHandler(req);
}

export async function POST(req: NextRequest) {
    return postHandler(req);
}
