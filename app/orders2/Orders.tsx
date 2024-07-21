"use client";

import fetcher from "@/lib/fetcher";
import { OrderType, TicketType } from "@/lib/types";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import OrderCard from "./OrderCard";

export default function Orders() {
    const { user } = useContext(AuthContext);
    const { data: tickets, error, isLoading } = useSWRImmutable<TicketType[]>(user?.token ? ["/tickets", user.token] : null, ([url, token]) => fetcher(url, token as string));
    const { data: orders, error: ordersError, isLoading: ordersLoading } = useSWR<OrderType[]>(user?.token ? ["/orders/all/today", user.token] : null, ([url, token]) => fetcher(url, token as string));
    console.log(orders);
    return (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
            {Array.isArray(orders) &&
                orders.map((order, index) => {
                    return <OrderCard key={index} className=" p-5 rounded-lg shadow-md" order={order} />;
                })}
        </div>
    );
}
