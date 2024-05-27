"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { OrderType } from "@/lib/types";
import useOrder from "../useOrder";
import { useParams } from "next/navigation";

export default function Home() {
    const { orders, createOrder } = useOrder();
    const [selectedOrder, setSelectedOrder] = useState<OrderType>();
    const order_id = useParams().id as string;

    useEffect(() => {
        orders && setSelectedOrder(orders.find((order: OrderType) => order.id === order_id));
    }, [order_id, orders]);

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <div className="w-full flex gap-5">
                <Card className="flex-[2]">
                    <CardHeader>
                        <CardTitle>Your Cart</CardTitle>
                        <CardDescription>ID : {selectedOrder?.id}</CardDescription>
                        <Badge className="w-fit">{selectedOrder?.status}</Badge>
                    </CardHeader>
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Total Items : {selectedOrder?.items.length}</CardDescription>
                        <CardDescription>Total Price : ¥{selectedOrder?.total}</CardDescription>
                    </CardContent>
                </Card>
            </div>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">Name</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">amount</TableHead>
                                <TableHead className="text-right">total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {selectedOrder &&
                                selectedOrder.items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.ticket.name}</TableCell>
                                        <TableCell className="text-center">{item.quantity}</TableCell>
                                        <TableCell className="text-right">¥{item.ticket.price}</TableCell>
                                        <TableCell className="text-right">¥{item.ticket.price * item.quantity}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Button className="w-full" variant={selectedOrder?.status === "purchased" ? "default" : "outline"} onClick={() => selectedOrder?.status === "purchased" && createOrder(order_id)}>
                {selectedOrder?.status === "purchased" ? "Order Now" : "You Already Ordered"}
            </Button>
        </div>
    );
}
