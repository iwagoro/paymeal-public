"use client";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/provider/app-provider";
import { OrderType } from "@/lib/types";
import { getUserUsage } from "@/lib/api/user";
import { getLatestOrder } from "@/lib/api/order";

export function useHorm() {
    const { user } = useContext(AppContext);
    const [latestOrder, setLatestOrder] = useState<OrderType | null>(null);
    const [usage, setUsage] = useState<number>(0);

    useEffect(() => {
        user.token &&
            Promise.all([getLatestOrder(user.token), getUserUsage(user.token)]).then(([order, usage]) => {
                setLatestOrder(order);
                setUsage(usage);
            });
    }, [user]);

    return { user, latestOrder, usage };
}
