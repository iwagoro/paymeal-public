"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense, useContext, useEffect, useState } from "react";
import { PulseSpinner } from "react-spinners-kit";
import { Skeleton } from "@/components/ui/skeleton";
import OrdersTable from "./OrdersTable";

export default function OrdersCard() {
    const tabs = ["purchased", "ordered", "completed"];
    const [status, setStatus] = useState("purchased");

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
                    <CardContent>{<OrdersTable status={status} />}</CardContent>
                </Card>
            </Tabs>
        </Suspense>
    );
}
