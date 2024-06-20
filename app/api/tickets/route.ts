// app/api/user/route.ts

import { NextRequest } from "next/server";
import { getHandler } from "../handler";

export async function GET(req: NextRequest) {
    return getHandler(req);
}
