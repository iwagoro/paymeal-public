"use client";
import { useState, useEffect, useContext } from "react";
import { OrderType } from "@/lib/types";
import { AppContext } from "@/provider/app-provider";
import { getOrders, placeOrder } from "@/lib/api/order";
import { toast } from "sonner";
export default function useOrder() {
    const { user } = useContext(AppContext);
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [stateNames, setStateNames] = useState<string[]>(["purchased", "ordered", "completed"]);
    const [selectedState, setSelectedState] = useState<string>("purchased");
    const [selectedOrders, setSelectedOrders] = useState<OrderType[]>([]);

    //! 注文の取得
    useEffect(() => {
        user.token &&
            getOrders(user.token).then((data) => {
                setOrders(data);
            });
    }, [user]);

    useEffect(() => {
        orders && setSelectedOrders(orders.filter((order) => order.status === selectedState));
    }, [selectedState, orders]);

    const createOrder = (order_id: string) => {
        order_id && user.token && placeOrder(user.token, order_id);
    };

    return { orders, stateNames, selectedState, setSelectedState, selectedOrders, createOrder };
}
