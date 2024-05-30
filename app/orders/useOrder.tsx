"use client";
import { useState, useEffect, useContext } from "react";
import { OrderType } from "@/lib/types";
import { AppContext } from "@/provider/app-provider";
import { getOrders, placeOrder, getLatestOrder } from "@/lib/api/order";
import { toast } from "sonner";
export default function useOrder() {
    const { user } = useContext(AppContext);
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [stateNames, setStateNames] = useState<string[]>(["purchased", "ordered", "completed"]);
    const [selectedState, setSelectedState] = useState<string>("purchased");
    const [selectedOrders, setSelectedOrders] = useState<OrderType[]>([]);
    const [latestOrder, setLatestOrder] = useState<OrderType | null>(null);
    const [isLatestOrderExpired, setIsLatestOrderExpired] = useState<boolean>(false);

    //! 注文の取得
    useEffect(() => {
        user.token &&
            Promise.all([getOrders(user.token), getLatestOrder(user.token)]).then(([orders, latestOrder]) => {
                setOrders(orders);
                setLatestOrder(latestOrder);
            });
    }, [user]);

    useEffect(() => {
        orders && setSelectedOrders(orders.filter((order) => order.status === selectedState));
    }, [selectedState, orders]);

    useEffect(() => {
        const today = new Date();
        const orderDate = new Date(latestOrder?.date || "");
        setIsLatestOrderExpired(today > orderDate);
    }, [latestOrder]);

    const createOrder = (order_id: string) => {
        order_id && user.token && placeOrder(user.token, order_id);
    };

    return { orders, stateNames, selectedState, setSelectedState, selectedOrders, createOrder, latestOrder, isLatestOrderExpired };
}
