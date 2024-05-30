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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { H3, Large, Mute } from "@/components/ui/typography";

export default function Home() {
    const { orders, createOrder } = useOrder();
    const [selectedOrder, setSelectedOrder] = useState<OrderType>();
    const [isExpired, setIsExpired] = useState<boolean>(false);
    const order_id = useParams().id as string;

    useEffect(() => {
        orders && setSelectedOrder(orders.find((order: OrderType) => order.id === order_id));
    }, [order_id, orders]);

    useEffect(() => {
        const today = new Date();
        const orderDate = new Date(selectedOrder?.date || "");
        setIsExpired(today > orderDate);
    }, [selectedOrder]);

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            {selectedOrder && isExpired && (
                <Alert variant="destructive">
                    <AlertTitle className="text-2xl font-semibold flex gap-2 items-center">
                        <TriangleAlert />
                        Oops..
                    </AlertTitle>
                    <AlertDescription>This meal ticket is expired. Ordering is not possible. Please buy another one.</AlertDescription>
                </Alert>
            )}

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
            <Mute className="text-primary flex items-center w-full justify-center gap-2">
                <TriangleAlert className="h-4 w-4" />
                Please make sure that order is available between 11:00 and 13:00
            </Mute>
            <Mute className="flex w-full justify-center gap-2">Tickets are not cancelable or refundable. Tickets are valid only on the day of purchase.</Mute>
            <Button
                className="w-full"
                variant={selectedOrder?.status === "purchased" && !isExpired ? "default" : "outline"}
                onClick={() => selectedOrder?.status === "purchased" && !isExpired && createOrder(order_id)}
            >
                {selectedOrder?.status === "purchased" ? "Order Now" : "Unable to order"}
            </Button>
        </div>
    );
}
