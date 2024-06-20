"use client";

import { useState, useEffect, useContext } from "react";
import { CartType } from "@/lib/types";
import { AppContext } from "@/provider/app-provider";
import { apiRequest } from "@/lib/apiHandler";
import { toast } from "sonner";

export default function useCart() {
    const { user } = useContext(AppContext);
    const [cart, setCart] = useState<CartType>({
        id: "",
        total: 0,
        status: "",
        items: [],
        purchase_date: null,
        order_date: null,
        number: 0,
    });

    const getCart = async () => {
        apiRequest({
            method: "GET",
            endpoint: "/api/cart/",
            token: user.token,
        })
            .then((data) => {
                setCart(data);
            })
            .catch((error) => {
                toast.error("Failed to add to cart");
            });
    };

    const addToCart = async (ticket_id: number) => {
        apiRequest({
            method: "POST",
            endpoint: "/api/cart/",
            token: user.token,
            params: { ticket_id: ticket_id },
        })
            .then(() => {
                getCart();
            })
            .catch((error) => {
                toast.error("Failed to add to cart");
            });
    };

    const removeFromCart = async (ticket_id: number) => {
        apiRequest({
            method: "DELETE",
            endpoint: "/api/cart/",
            token: user.token,
            params: { ticket_id: ticket_id },
        })
            .then(() => {
                getCart();
            })
            .catch((error) => {
                toast.error("Failed to add to cart");
            });
    };

    const purchaseCart = async () => {
        apiRequest({
            method: "GET",
            endpoint: "/api/payment/",
            token: user.token,
            params: { order_id: cart.id },
        })
            .then((data) => {
                window.location.href = data.url;
            })
            .catch((error) => {
                toast.error("Failed to purchase cart");
            });
    };

    const deleteLink = async () => {
        apiRequest({
            method: "DELETE",
            endpoint: "/api/payment/",
            token: user.token,
            params: { order_id: cart.id },
        })
            .then(() => {
                toast.success("QR code deleted successfully");
            })
            .catch((error) => {
                toast.error("Failed to delete QR code");
            });
    };

    const confirmPayment = async () => {
        apiRequest({
            method: "PATCH",
            endpoint: "/api/payment/",
            token: user.token,
            params: { order_id: cart.id },
        })
            .then(() => {
                setCart({
                    id: "",
                    total: 0,
                    status: "",
                    items: [],
                    purchase_date: null,
                    order_date: null,
                    number: 0,
                });
            })
            .catch((error) => {
                toast.error("Failed to complete payment");
            });
    };

    //!　カートを取得する
    useEffect(() => {
        user.token && getCart();
    }, [user.token]);

    //!　５回５秒ごとに購入確認
    useEffect(() => {
        if (cart.status === "processing") {
            const interval = setInterval(() => {
                confirmPayment();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [cart]);

    return { cart, purchaseCart, deleteLink, confirmPayment, addToCart, removeFromCart };
}
