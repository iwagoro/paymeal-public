const url = process.env.NEXT_PUBLIC_API_URL;

import axios from "axios";
import { toast } from "sonner";

//! ユーザーのメールアドレスを取得する
export const getUserInfo = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/user`, config);
        return res.data.user;
    } catch {
        toast.error("Failed to get user info", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};

//! ユーザーの使用量を取得する
export const getUserUsage = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/user/usage`, config);
        return res.data.total;
    } catch {
        return 0;
    }
};

//! ユーザの先月の使用量を取得する
export const getLastUsage = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/user/last-month`, config);
        return res.data.total;
    } catch {
        return 0;
    }
};

//! ユーザーを追加する
export const addUser = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.post(`${url}/user`, {}, config);
    } catch {
        toast.error("Failed to add user", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};
