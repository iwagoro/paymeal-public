"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { toZonedTime, format } from "date-fns-tz";
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import modifier from "@/lib/modifier";
import { OrderType } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function LatestOrderCard() {
    const { user } = useContext(AuthContext);
    const { data: order, error, isLoading } = useSWR<OrderType>(user?.token ? ["/orders/latest", user.token] : null, ([url, token]) => fetcher(url, token as string));
    const today = format(toZonedTime(new Date(), "Asia/Tokyo"), "HH:mm");
    const isAvailable = today >= "11:00" && today <= "13:00";
    const isExpired = order?.purchase_date && order.purchase_date.toLocaleString() != today;

    const placeOrder = async () => {
        user?.token && order?.id && modifier.post("/orders/", user.token, { order_id: order.id });
    };

    if (error || isLoading) {
        return <Skeleton className="h-80 w-full " />;
    }

    return (
        <Card className="w-full">
            <CardHeader className="w-full flex flex-row justify-between">
                <div>
                    <CardTitle className="text-3xl">
                        Latest Order :<span className="text-4xl"> {order?.number ? `No.${order.number}` : ""}</span>
                    </CardTitle>
                    <CardDescription>ID : {order?.id ? order.id : "not found"}</CardDescription>
                    <CardDescription>Purchase Date : {order?.purchase_date ? order?.purchase_date.toLocaleString() : "not found"}</CardDescription>
                    <CardDescription>Order Date : {order?.order_date ? order?.order_date.toLocaleString() : "not found"}</CardDescription>
                </div>
                <Badge className="w-fit h-fit">{order?.status ? order.status : "not found"}</Badge>
            </CardHeader>

            <CardContent>
                {isExpired && (
                    <Alert variant="destructive">
                        <AlertTitle className="text-2xl font-semibold flex gap-2 items-center">
                            <TriangleAlert />
                            Oops..
                        </AlertTitle>
                        <AlertDescription>This ticket is expired. Ordering is not possible. Please buy another one.</AlertDescription>
                    </Alert>
                )}
            </CardContent>
            <CardContent>
                {Array.isArray(order?.items) && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">Ticket</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">amount</TableHead>
                                <TableHead className="text-right">total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.ticket_name}</TableCell>
                                    <TableCell className="text-center">{item.quantity}</TableCell>
                                    <TableCell className="text-right">¥{item.ticket_price}</TableCell>
                                    <TableCell className="text-right">¥{item.ticket_price * item.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                <Button disabled={order?.status !== "purchased" || isExpired || !isAvailable} className="w-full" onClick={placeOrder}>
                    {order?.status === "purchased" && !isExpired ? "Order" : "Unable to order"}
                </Button>
            </CardContent>
        </Card>
    );
}
