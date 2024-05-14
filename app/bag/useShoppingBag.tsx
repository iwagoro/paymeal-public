"use client";
import { useContext } from "react";
import { AppContext } from "@/components/util/provider/app-provider";
import { useState, useEffect } from "react";
import { completeOrder, getCart, purchase, increaseItem, decreaseItem, deleteItem } from "@/lib/appUtils";
interface itemProps {
    ticket: {
        img_url: string;
        name: string;
        price: number;
    };
    quantity: number;
}

interface cartProps {
    id: string;
    items: itemProps[];
    status: string;
}

export function useShoppingBag() {
    const { user } = useContext(AppContext);
    const [cart, setCart] = useState<itemProps[]>([]);
    const [cartId, setCartId] = useState<string>("");
    const [cartStatus, setCartStatus] = useState<string>("");
    const [total, setTotal] = useState<number>(0);

    //! ユーザーがログインしている場合、カートを取得する
    useEffect(() => {
        if (!user) return;
        getCart(user.token).then((data: cartProps | void | null) => {
            setCart(data?.items || []);
            setCartId(data?.id || "");
            setCartStatus(data?.status || "");
            const total = (Array.isArray(data?.items) && data?.items.reduce((acc: number, item: itemProps) => acc + item.ticket.price * item.quantity, 0)) || 0;
            setTotal(total);
        });
    }, [user]);

    useEffect(() => {
        if (cartStatus === "processing") {
            console.log("Processing payment...");
            checkPayment();
        }
    }, [cartStatus]);

    //! 決済リンクを取得する
    const getPayment = async () => {
        const link = await purchase(user.token, cartId);
        console.log(link);
        if (link) window.location.href = link;
        else alert("エラーが発生しました");
    };

    //!アイテムの追加
    const add = async (ticket_id: number) => {
        if (!user) return;
        const status = await increaseItem(user.token, ticket_id);
        if (status) {
            const item = cart.find((item: any) => item.ticket.id === ticket_id);
            if (item) {
                item.quantity++;
                setCart([...cart]);
                setTotal(total + item.ticket.price);
            }
        } else {
            alert("エラーが発生しました");
        }
    };

    //!アイテムの減少
    const sub = async (ticket_id: number) => {
        if (!user) return;
        const status = await decreaseItem(user.token, ticket_id);
        if (status) {
            const item = cart.find((item: any) => item.ticket.id === ticket_id);
            if (item) {
                item.quantity--;
                setTotal(total - item.ticket.price);
                if (item.quantity === 0) {
                    setCart(cart.filter((item: any) => item.ticket.id !== ticket_id));
                } else {
                    setCart([...cart]);
                }
            }
        } else {
            alert("エラーが発生しました");
        }
    };

    //!アイテムの削除
    const del = async (ticket_id: number) => {
        if (!user) return;
        const status = await deleteItem(user.token, ticket_id);
        if (status) {
            const item = cart.find((item: any) => item.ticket.id === ticket_id);
            if (item) {
                setTotal(total - item.ticket.price * item.quantity);
            }
            setCart(cart.filter((item: any) => item.ticket.id !== ticket_id));
        } else {
            alert("エラーが発生しました");
        }
    };

    //! 決済が完了するまでポーリングする
    const checkPayment = async () => {
        const interval = 5000;
        const timeout = 300000; // 5分
        let elapsedTime = 0;

        const polling = async () => {
            if (elapsedTime >= timeout) {
                console.log("Timeout reached, stopping polling.");
                return;
            }

            try {
                const data = await completeOrder(user.token, cartId);
                if (data) {
                    alert("購入が完了しました");
                    setCart([]);
                    setCartId("");
                    setCartStatus("");
                    setTotal(0);
                } else {
                    elapsedTime += interval;
                    setTimeout(polling, interval);
                }
            } catch (error) {
                console.error("Polling error: ", error);
            }
        };

        polling();
    };

    return { cart, total, cartStatus, cartId, getPayment, checkPayment, add, sub, del };
}
