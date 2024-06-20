import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosRequestConfig } from "axios";

const url = process.env.NEXT_PUBLIC_API_URL;

export async function getHandler(req: NextRequest) {
    const endpoint = req.nextUrl.pathname.replace("/api", "");
    const apiUrl = `${url}${endpoint}`;
    const token = req.headers.get("authorization")?.split(" ")[1];
    const queryParams = req.nextUrl.searchParams;
    const useCache = req.headers.get("use-cache") === "true";

    let fullUrl = apiUrl;
    if (queryParams.toString()) {
        fullUrl += `?${queryParams.toString()}`;
    }

    const config: AxiosRequestConfig = {
        headers: {},
    };

    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    try {
        const response = await axios.get(fullUrl, config);

        const nextResponse = NextResponse.json(response.data);
        if (useCache) {
            nextResponse.headers.set("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");
        }

        return nextResponse;
    } catch (error: unknown) {
        const errorMessage = axios.isAxiosError(error) && error.response?.data ? error.response.data : "An unknown error occurred";
        const status = axios.isAxiosError(error) && error.response ? error.response.status : 500;

        return new NextResponse(JSON.stringify({ error: errorMessage }), { status });
    }
}
export async function postHandler(req: NextRequest) {
    const endpoint = req.nextUrl.pathname.replace("/api", "");
    const apiUrl = `${url}${endpoint}`;
    const token = req.headers.get("authorization")?.split(" ")[1];
    const queryParams = req.nextUrl.searchParams;

    let fullUrl = apiUrl;
    if (queryParams.toString()) {
        fullUrl += `/?${queryParams.toString()}`;
    }

    const config: AxiosRequestConfig = {
        headers: {},
    };

    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    try {
        const response = await axios.post(fullUrl, req.body, config);

        return NextResponse.json(response.data);
    } catch (error: unknown) {
        const errorMessage = axios.isAxiosError(error) && error.response?.data ? error.response.data : "An unknown error occurred";
        const status = axios.isAxiosError(error) && error.response ? error.response.status : 500;

        return new NextResponse(JSON.stringify({ error: errorMessage }), { status });
    }
}

export async function patchHandler(req: NextRequest) {
    const endpoint = req.nextUrl.pathname.replace("/api", "");
    const apiUrl = `${url}${endpoint}`;
    const token = req.headers.get("authorization")?.split(" ")[1];
    const queryParams = req.nextUrl.searchParams;

    let fullUrl = apiUrl;
    if (queryParams.toString()) {
        fullUrl += `?${queryParams.toString()}`;
    }

    const config: AxiosRequestConfig = {
        headers: {},
    };

    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    try {
        const response = await axios.patch(fullUrl, req.body, config);

        return NextResponse.json(response.data);
    } catch (error: unknown) {
        const errorMessage = axios.isAxiosError(error) && error.response?.data ? error.response.data : "An unknown error occurred";
        const status = axios.isAxiosError(error) && error.response ? error.response.status : 500;

        return new NextResponse(JSON.stringify({ error: errorMessage }), { status });
    }
}

export async function deleteHandler(req: NextRequest) {
    const endpoint = req.nextUrl.pathname.replace("/api", "");
    const apiUrl = `${url}${endpoint}`;
    const token = req.headers.get("authorization")?.split(" ")[1];
    const queryParams = req.nextUrl.searchParams;

    let fullUrl = apiUrl;
    if (queryParams.toString()) {
        fullUrl += `/?${queryParams.toString()}`;
    }

    const config: AxiosRequestConfig = {
        headers: {},
    };

    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    try {
        const response = await axios.delete(fullUrl, config);

        return NextResponse.json(response.data);
    } catch (error: unknown) {
        const errorMessage = axios.isAxiosError(error) && error.response?.data ? error.response.data : "An unknown error occurred";
        const status = axios.isAxiosError(error) && error.response ? error.response.status : 500;

        return new NextResponse(JSON.stringify({ error: errorMessage }), { status });
    }
}
