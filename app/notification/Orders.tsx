"use client";
import { useContext, useEffect } from "react";
import useNotification from "./useNotification";
import { AppContext } from "@/components/util/provider/app-provider";
import OrderCard from "./OrderCard";
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { getMessaging } from "firebase/messaging";
import { onMessage } from "firebase/messaging";
export default function Orders() {
    const { order, orderId, orderDate, orderStatus } = useNotification();
    const { user } = useContext(AppContext);
    let isAvailable = false;
    const date = new Date();
    if (date.getHours() > 7 && date.getHours() < 18) {
        isAvailable = true;
    }

    useEffect(() => {
        const messaging = getMessaging();
        onMessage(messaging, (payload) => {
            alert("Message received. " + payload);
        });
    }, []);

    return (
        <div className="w-full flex flex-col justify-start items-center gap-5">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-primary">{isAvailable ? "Order available" : "Order not available"}</CardTitle>

                    <CardDescription>Orders can be placed from 11:00 a.m. to 1:00 p.m.</CardDescription>
                </CardHeader>
            </Card>
            {Array.isArray(order) &&
                order.map((item, index) => <OrderCard key={index} user={user} order={item} orderId={orderId[index]} orderDate={orderDate[index]} orderStatus={orderStatus[index]} />)}
        </div>
    );
}
