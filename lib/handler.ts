import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios";

//! 共通エラーハンドリング関数
const handleAxiosError = (error: AxiosError) => {
    if (error.response) {
        const responseData: unknown = error.response.data;
        console.log("Error Code: " + error.response.status + " Message: " + (responseData as any).detail);
    } else {
        console.log("Error", error.message);
    }
};

//! 汎用的なHTTPリクエストハンドラー
export const universalHandler = async (method: Method, url: string, data: any = {}, config: AxiosRequestConfig = {}) => {
    try {
        const response: AxiosResponse = await axios({ method, url, data, ...config });
        // * 200 OK
        if (response.status === 200) {
            return response.data;
        }
        // * 201 Created or deleted
        else if (response.status === 201) {
            console.log(response.data);
            return true;
        }
        // * 202 Accepted
        else if (response.status === 202) {
            return true;
        }
        // * 204 No Content
        else if (response.status === 204) {
            console.log("No Content");
            return null;
        }
        // * other
        else {
            console.log("Unknown error occurred");
            return null;
        }
    } catch (error) {
        handleAxiosError(error as AxiosError);
        return null;
    }
};
