const url = "https://pre-4sqaf6trhq-an.a.run.app";
import { universalHandler } from "./handler";

//? ユーザ関連のAPI--------------------------------------------

//! ユーザを追加する
export const addUser = async (token: string) => {
    if (!token) return;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await universalHandler("POST", `${url}/user`, {}, config);
};

//! ユーザーのメールアドレスを取得する
export const getUserEmail = async (token: string) => {
    if (!token) return null;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await universalHandler("GET", `${url}/user`, {}, config);
};

//? チケット関連のAPI--------------------------------------------

//! チケットを取得する
export const getTickets = async () => {
    return await universalHandler("GET", `${url}/tickets`, {}, {});
};

//! カートにチケットを追加する
export const increaseItem = async (token: string, ticket_id: number) => {
    if (!token) return null;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await universalHandler("POST", `${url}/cart/${ticket_id}`, {}, config);
};

//! カートからチケットを減らす
export const decreaseItem = async (token: string, ticket_id: number) => {
    if (!token) return null;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await universalHandler("DELETE", `${url}/cart/${ticket_id}`, {}, config);
};

//! カートからチケットを削除する
export const deleteItem = async (token: string, ticket_id: number) => {
    if (!token) return null;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await universalHandler("DELETE", `${url}/cart/${ticket_id}/all`, {}, config);
};

//? カート関連のAPI--------------------------------------------

//! カートを取得する
export const getCart = async (token: string) => {
    if (!token) return null;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const cart = await universalHandler("GET", `${url}/cart`, {}, config);
    if (!cart) return null;
    return { items: cart.items, status: cart.status, id: cart.id };
};

//! 購入する
export const purchase = async (token: string, order_id: string) => {
    if (!token) return null;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await universalHandler("GET", `${url}/payment/${order_id}`, {}, config);
};

//! 注文状態をリッスンする
export const completeOrder = async (token: string, order_id: string) => {
    if (!token || !order_id) null;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await universalHandler("POST", `${url}/payment/${order_id}`, {}, config);
};

//? 通知関連のAPI--------------------------------------------

//! 通知のためのトークンを送信する

export const sendToken = async (token: string, notification_token: string) => {
    if (!token) return null;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await universalHandler("POST", `${url}/notification`, { token: notification_token }, config);
};

//! 注文可能オーダーを取得する

export const getOrder = async (token: string) => {
    if (!token) return null;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const orders = await universalHandler("GET", `${url}/order`, {}, config);
    if (!orders) return null;
    const result = orders.map((order: any) => {
        return { items: order.items, status: order.status, id: order.id, date: order.date };
    });
    return result;
};

//! 注文する

export const place_order = async (token: string, order_id: string) => {
    if (!token) return null;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await universalHandler("POST", `${url}/order/${order_id}`, {}, config);
};

//?　管理者関連のAPI--------------------------------------------

export const addTicket = async (token: string, ticket: any) => {
    if (!token) return null;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    console.log(ticket);
    return await universalHandler("POST", `${url}/tickets`, ticket, config);
};
export const addAdmin = async (token: string, passwd: string) => {
    if (!token) return null;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await universalHandler("POST", `${url}/admin-user`, { password: "Admin123" }, config);
};
