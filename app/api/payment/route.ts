import { NextRequest, NextResponse } from "next/server";
import { getHandler, patchHandler, deleteHandler } from "../handler";

export async function GET(req: NextRequest) {
    return getHandler(req);
}
export async function PATCH(req: NextRequest) {
    return patchHandler(req);
}

export async function DELETE(req: NextRequest) {
    return deleteHandler(req);
}
