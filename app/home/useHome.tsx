"use client";
import { useState, useEffect, useContext, use } from "react";
import { AppContext } from "@/provider/app-provider";
import { OrderType } from "@/lib/types";
import { apiRequest } from "@/lib/apiHandler";

type UsageType = {
    current_month_total: number;
    last_month_total: number;
};

export default function useHome() {
    const { user } = useContext(AppContext);
    const [latestOrder, setLatestOrder] = useState<OrderType | null>(null);
    const [usage, setUsage] = useState<UsageType>({ current_month_total: 0, last_month_total: 0 });

    const getUsage = async () => {
        apiRequest({
            method: "GET",
            endpoint: "/api/user/usage",
            token: user.token,
            // params: { /* 必要なクエリパラメータがあればここに追加 */ },
        }).then((data) => {
            setUsage(data);
        });
    };

    useEffect(() => {
        if (user.token) {
            getUsage();
        }
    }, [user.token]);

    return { user, latestOrder, usage };
}
