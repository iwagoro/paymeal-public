import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { toZonedTime, format } from "date-fns-tz";

import useOrder from "./useOrder";

export default function LatestOrderCard() {
    const { latestOrder: order, createOrder } = useOrder();
    const today = format(toZonedTime(new Date(), "Asia/Tokyo"), "yyyy-MM-dd");
    const isExpired = order?.order_date && order.order_date.toLocaleString() != today;

    return (
        <Card className="w-full">
            <CardHeader className="w-full flex flex-row justify-between">
                <div>
                    <CardTitle className="text-3xl">
                        Latest Order :<span className="text-4xl"> {order?.number ? `No.${order.number}` : ""}</span>
                    </CardTitle>
                    <CardDescription>ID : {order?.id}</CardDescription>
                    <CardDescription>Purchase Date : {order?.purchase_date && order?.purchase_date.toLocaleString()}</CardDescription>
                    <CardDescription>Order Date : {order?.order_date && order?.order_date.toLocaleString()}</CardDescription>
                </div>
                <Badge className="w-fit h-fit">{order?.status}</Badge>
            </CardHeader>
            <CardContent>
                {order?.id ? (
                    <Accordion type="single" collapsible defaultValue="item-1">
                        <AccordionItem value="item-1">
                            <div className="w-full flex justify-start gap-5 ">
                                <AccordionPrimitive.Trigger asChild>
                                    <div className="p-2 flex w-full items-center gap-4">
                                        <Switch defaultChecked />

                                        <CardDescription>Show Details</CardDescription>
                                    </div>
                                </AccordionPrimitive.Trigger>
                            </div>
                            {isExpired && (
                                <AccordionContent>
                                    <Alert variant="destructive">
                                        <AlertTitle className="text-2xl font-semibold flex gap-2 items-center">
                                            <TriangleAlert />
                                            Oops..
                                        </AlertTitle>
                                        <AlertDescription>This ticket is expired. Ordering is not possible. Please buy another one.</AlertDescription>
                                    </Alert>
                                </AccordionContent>
                            )}
                            <AccordionContent>
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
                                        {Array.isArray(order?.items) &&
                                            order.items.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{item.ticket_name}</TableCell>
                                                    <TableCell className="text-center">{item.quantity}</TableCell>
                                                    <TableCell className="text-right">¥{item.ticket_price}</TableCell>
                                                    <TableCell className="text-right">¥{item.ticket_price * item.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </AccordionContent>
                            <Button disabled={order.status !== "purchased" || isExpired} onClick={() => order.status === "purchased" && !isExpired && createOrder(order.id)} className="w-full">
                                {order.status === "purchased" && !isExpired ? "Order" : "Unable to order"}
                            </Button>
                        </AccordionItem>
                    </Accordion>
                ) : (
                    <CardDescription>No orders found</CardDescription>
                )}
            </CardContent>
        </Card>
    );
}
