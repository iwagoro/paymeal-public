"use client";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/provider/app-provider";
import { OrderType } from "@/lib/types";
import { getUserUsage, getLastUsage } from "@/lib/api/user";
import { getLatestOrder } from "@/lib/api/order";

export function useHorm() {
    const { user } = useContext(AppContext);
    const [latestOrder, setLatestOrder] = useState<OrderType | null>(null);
    const [usage, setUsage] = useState<number>(0);
    const [lastUsage, setLastUsage] = useState<number>(0);
    const [isAvailable, setIsAvailable] = useState<boolean>(false);

    useEffect(() => {
        user.token &&
            Promise.all([getLatestOrder(user.token), getUserUsage(user.token), getLastUsage(user.token)]).then(([order, usage, lastUsage]) => {
                setLatestOrder(order);
                setUsage(usage);
                setLastUsage(lastUsage);
            });
    }, [user]);

    useEffect(() => {
        const now = new Date();
        const hour = now.getHours();
        setIsAvailable(hour >= 11 && hour <= 13);
    }, []);

    return { user, latestOrder, usage, isAvailable, lastUsage };
}
