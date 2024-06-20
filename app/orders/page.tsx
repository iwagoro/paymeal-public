"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LatestOrderCard from "./LatestOrderCard";
import useOrder from "./useOrder";
import OrdersTable from "./OrdersTable";
import OrdersCard from "./OrdersCard";

export default function Home() {
    const { orders, status, setStatus } = useOrder();
    const tabs = ["purchased", "ordered", "completed"];
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <LatestOrderCard />
            <OrdersCard />
        </div>
    );
}
