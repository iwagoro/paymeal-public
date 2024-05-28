import axios from "axios";
import { toast } from "sonner";
const url = process.env.NEXT_PUBLIC_API_URL;

//! 全てのチケットを取得する
export const getAllTickets = async () => {
    try {
        const res = await axios.get(`${url}/tickets`);
        return res.data.tickets;
    } catch {
        return [];
    }
};

//! 全てのタグを取得する
export const getTags = async () => {
    try {
        const res = await axios.get(`${url}/tags`);
        return res.data.tags;
    } catch {
        return [];
    }
};

//! チケットとタグの関連を取得する
export const getRelations = async () => {
    try {
        const res = await axios.get(`${url}/relations`);
        return res.data.relations;
    } catch {
        return [];
    }
};

//! カートに追加する
export const addTicket = async (token: string, ticket_id: number) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.post(`${url}/cart/${ticket_id}`, {}, config);
        toast.success("Added to cart", { style: { color: "#FFFFFF", background: "#008000" } });
    } catch {
        toast.error("Failed to add ticket", { style: { color: "#FFFFFF", background: "#FF0000" } });
    }
};
