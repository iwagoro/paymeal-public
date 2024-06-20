"use client";
import { useState, useEffect, useContext, use } from "react";
import { OrderType } from "@/lib/types";
import { AppContext } from "@/provider/app-provider";
import { apiRequest } from "@/lib/apiHandler";
import { toast } from "sonner";

export default function useOrder() {
    const { user } = useContext(AppContext);
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [latestOrder, setLatestOrder] = useState<OrderType | null>(null);
    const [status, setStatus] = useState<string>("purchased");

    //! すべての注文を取得
    const getOrders = async () => {
        apiRequest({
            method: "GET",
            endpoint: "/api/orders/all/",
            token: user.token,
            params: { status: status },
        }).then((data) => {
            setOrders(data);
        });
    };

    //! 最新の注文を取得
    const getLatestOrder = async () => {
        apiRequest({
            method: "GET",
            endpoint: "/api/orders/latest",
            token: user.token,
        }).then((data) => {
            setLatestOrder(data);
        });
    };

    //! 注文を作成
    const createOrder = async (id: string) => {
        apiRequest({
            method: "GET",
            endpoint: "/api/orders/",
            token: user.token,
            params: { order_id: id },
        })
            .then((data) => {
                toast.success("Order created successfully");
            })
            .catch((error) => {
                toast.error("Failed to create order");
            });
    };

    useEffect(() => {
        if (user) {
            getOrders();
            getLatestOrder();
        }
    }, [user]);

    useEffect(() => {
        getOrders();
    }, [status]);

    return { orders, latestOrder, status, setStatus, createOrder };
}
