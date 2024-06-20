import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const pathname = request.nextUrl.pathname;

    // ルートごとにキャッシュ制御ヘッダーを設定
    if (pathname.startsWith("/tickets")) {
        response.headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=59");
    } else if (pathname.startsWith("/tags")) {
        response.headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=59");
    }

    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
}

// マッチするパスを指定
export const config = {
    matcher: "/",
};
