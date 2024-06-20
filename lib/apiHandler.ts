import axios, { AxiosRequestConfig, Method } from "axios";
import { toast } from "sonner";

interface RequestOptions {
    method: Method;
    endpoint: string;
    token?: string;
    params?: Record<string, string | number>;
    data?: any;
    useCache?: boolean;
}

export const apiRequest = async ({ method, endpoint, token, params, data, useCache = false }: RequestOptions) => {
    const config: AxiosRequestConfig = {
        method,
        url: endpoint,
        headers: {},
        params: {},
        data: data || {}, // POSTやPUTの場合のデータ
    };

    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    if (params) {
        config.params = params;
    }

    if (useCache) {
        config.headers = {
            ...config.headers,
            "use-cache": "true",
        };
    }

    try {
        const res = await axios.request(config);
        return res.data;
    } catch (error: unknown) {
        const errorMessage = axios.isAxiosError(error) && error.response?.data ? error.response.data.error || "Failed to fetch data from external API" : "Failed to fetch data from external API";

        toast.error(errorMessage);
        throw error; // エラーを再スローすることで呼び出し元でもハンドリング可能にする
    }
};
