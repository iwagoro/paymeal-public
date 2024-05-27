"use client";

import { useState, useEffect, useContext } from "react";
import { OrderType } from "@/lib/types";
import { addTicketToCart, getCart, subTicketFromCart } from "@/lib/api/cart";
import { completeOrder, deleteCart, purchase } from "@/lib/api/payment";
import { AppContext } from "@/provider/app-provider";

export default function useCart() {
    const { user } = useContext(AppContext);
    const [cart, setCart] = useState<OrderType | null>();

    //! カートの取得
    useEffect(() => {
        user.token &&
            getCart(user.token).then((data) => {
                setCart(data);
            });
    }, [user]);

    useEffect(() => {
        user.token && cart?.status === "processing" && completeOrder(user.token, cart.id).then((state) => setCart(null));
    }, [cart]);

    const increaseQuantity = async (id: number) => {
        addTicketToCart(user.token, id).then(() => {
            setCart((prev) => {
                if (prev) {
                    const newItems = prev.items.map((item) => {
                        if (item.ticket.id === id) {
                            return { ticket: item.ticket, quantity: item.quantity + 1 };
                        }
                        return item;
                    });
                    const newTotal = newItems.reduce((sum, item) => sum + item.quantity * item.ticket.price, 0);
                    return { ...prev, items: newItems, total: newTotal };
                }
                return prev;
            });
        });
    };

    const decreaseQuantity = async (id: number) => {
        subTicketFromCart(user.token, id).then(() => {
            setCart((prev) => {
                if (prev) {
                    const newItems = prev.items
                        .map((item) => {
                            if (item.ticket.id === id) {
                                return { ticket: item.ticket, quantity: item.quantity - 1 };
                            }
                            return item;
                        })
                        .filter((item) => item.quantity > 0);
                    const newTotal = newItems.reduce((sum, item) => sum + item.quantity * item.ticket.price, 0);
                    return { ...prev, items: newItems, total: newTotal };
                }
                return prev;
            });
        });
    };

    //! 決済リンクを作成する
    const purchaseCart = async () => {
        cart && user.token && purchase(user.token, cart.id);
    };

    //! 決済リンクを削除する
    const deleteLink = async () => {
        cart && user.token && deleteCart(user.token, cart.id);
    };

    //! 購入確認
    const confirmPurchase = async () => {
        cart && user.token && completeOrder(user.token, cart.id);
    };

    return { cart, purchaseCart, confirmPurchase, deleteLink, increaseQuantity, decreaseQuantity };
}
