"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersTable from "./OrdersTable";
import { getHandler } from "@/lib/apiHandler";
import { OrderType } from "@/lib/types";
import { Suspense, useEffect, useState } from "react";
import { PulseSpinner } from "react-spinners-kit";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

const getOrders = async (token: string, status: string) => {
    const orders = await getHandler({ method: "GET", endpoint: "/orders/all/", params: { status: status }, token: token, revalidate: 10, returnType: "array" });
    return orders;
};

export default function OrdersCard() {
    const tabs = ["purchased", "ordered", "completed"];
    const { data: session } = useSession();
    const [orders, setOrders] = useState<OrderType[]>({} as OrderType[]);
    const [status, setStatus] = useState("purchased");

    useEffect(() => {
        console.log(status);
        if (session?.idToken) {
            getOrders(session.idToken, status).then((data) => {
                setOrders(data);
            });
        }
    }, [status]);

    return (
        <Suspense
            fallback={
                <Tabs defaultValue="purchased" className="w-full flex flex-col gap-5 ">
                    <TabsList className="w-fit">
                        {["purchased", "ordered", "completed"].map((tab, index) => (
                            <TabsTrigger key={index} value={tab}>
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <Card>
                        <Skeleton className="h-40">
                            <CardHeader className="h-full flex justify-center items-center">
                                <PulseSpinner size={40} color="blue" />
                            </CardHeader>
                        </Skeleton>
                    </Card>
                </Tabs>
            }
        >
            <Tabs defaultValue="purchased" className="w-full flex flex-col gap-5" onValueChange={(tab) => setStatus(tab)}>
                <TabsList className="w-fit">
                    {tabs.map((tab, index) => (
                        <TabsTrigger key={index} value={tab}>
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <Card>
                    <CardHeader>
                        <CardTitle>Orders</CardTitle>
                    </CardHeader>
                    <CardContent>{<OrdersTable orders={orders} />}</CardContent>
                </Card>
            </Tabs>
        </Suspense>
    );
}
