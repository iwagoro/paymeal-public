import { NextRequest, NextResponse } from "next/server";
import { getHandler, postHandler, deleteHandler } from "@/app/api/handler";

export async function GET(req: NextRequest) {
    return getHandler(req);
}

export async function POST(req: NextRequest) {
    return postHandler(req);
}

export async function DELETE(req: NextRequest) {
    return deleteHandler(req);
}
