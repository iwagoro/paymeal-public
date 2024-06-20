import { NextRequest, NextResponse } from "next/server";
import { getHandler, postHandler } from "../handler";

export async function GET(req: NextRequest) {
    return getHandler(req);
}

export async function POST(req: NextRequest) {
    return postHandler(req);
}
