import axios from "axios";
import { toast } from "sonner";

const url = process.env.NEXT_PUBLIC_API_URL;

//! 全ての注文を取得する
export const getOrders = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/orders/purchased`, config);
        return res.data.orders;
    } catch {
        return [];
    }
};

//! 最新の注文を取得する
export const getLatestOrder = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/orders/latest`, config);
        console.log(res);
        return res.data.order;
    } catch {
        return {};
    }
};

//! 注文を作成する
export const placeOrder = async (token: string, order_id: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.post(`${url}/orders/${order_id}`, { order_id }, config);
        toast.success("Order created successfully", { style: { color: "#FFFFFF", background: "#008000" } });
    } catch {
        toast.error("Failed to place order", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};
