"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import useOrder from "./useOrder";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    const { selectedOrders, stateNames, createOrder, selectedState, setSelectedState, latestOrder, isLatestOrderExpired } = useOrder();
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <Card className="w-full">
                <CardHeader className="w-full flex flex-row justify-between">
                    <div>
                        <CardTitle className="text-3xl">
                            Latest Order :<span className="text-4xl"> {latestOrder?.number ? "No." + latestOrder.number : ""}</span>
                        </CardTitle>
                        <CardDescription>ID : {latestOrder?.id}</CardDescription>
                        <CardDescription>Order Date : {latestOrder?.date}</CardDescription>
                    </div>
                    <Badge className="w-fit h-fit">{latestOrder?.status}</Badge>
                </CardHeader>
                <CardContent>
                    {latestOrder?.id ? (
                        <Accordion type="single" collapsible defaultValue="item-1">
                            <AccordionItem value="item-1">
                                <div className="w-full flex justify-start gap-5 ">
                                    <AccordionPrimitive.Trigger>
                                        <Switch defaultChecked />
                                    </AccordionPrimitive.Trigger>
                                    <CardDescription>Show Details</CardDescription>
                                </div>
                                {isLatestOrderExpired && (
                                    <AccordionContent>
                                        <Alert variant="destructive">
                                            <AlertTitle className="text-2xl font-semibold flex gap-2 items-center">
                                                <TriangleAlert />
                                                Oops..
                                            </AlertTitle>
                                            <AlertDescription>This meal ticket is expired. Ordering is not possible. Please buy another one.</AlertDescription>
                                        </Alert>
                                    </AccordionContent>
                                )}
                                <AccordionContent className="border rounded-2xl">
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
                                            {Array.isArray(latestOrder?.items) &&
                                                latestOrder.items.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{item.ticket.name}</TableCell>
                                                        <TableCell className="text-center">{item.quantity}</TableCell>
                                                        <TableCell className="text-right">¥{item.ticket.price}</TableCell>
                                                        <TableCell className="text-right">¥{item.ticket.price * item.quantity}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </AccordionContent>
                                <AccordionContent>
                                    <Button
                                        variant={latestOrder.status === "purchased" && !isLatestOrderExpired ? "default" : "outline"}
                                        onClick={() => latestOrder.status === "purchased" && !isLatestOrderExpired && createOrder(latestOrder.id)}
                                        className="w-full"
                                    >
                                        {latestOrder.status === "purchased" && !isLatestOrderExpired ? "Order" : "Unable to order"}
                                    </Button>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ) : (
                        <CardDescription>No orders found</CardDescription>
                    )}
                </CardContent>
            </Card>
            <Tabs defaultValue="purchased" className="w-full flex flex-col gap-5">
                <TabsList className="w-fit">
                    {stateNames.map((state, index) => (
                        <TabsTrigger key={index} value={state} onClick={() => setSelectedState(state)}>
                            {state}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <Card className="w-full">
                    <CardHeader className="flex-row justify-between">
                        <CardTitle>Orders</CardTitle>
                        <Badge className="w-fit">{selectedState}</Badge>
                    </CardHeader>
                    <CardContent>
                        <TabsContent value={selectedState}>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-left">No.</TableHead>
                                        <TableHead className="text-left">ID</TableHead>
                                        <TableHead className="text-center">status</TableHead>
                                        <TableHead className="text-right">Date</TableHead>
                                        <TableHead className="text-right">price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                {selectedOrders.length > 0 ? (
                                    selectedOrders.map((item, index) => (
                                        <TableBody key={index}>
                                            <TableRow>
                                                <TableCell className="text-left">{item.number}</TableCell>
                                                <TableCell className="text-left">
                                                    <Link href={"/orders/" + item.id} className="text-primary underline">
                                                        {item.id}
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge>{item.status}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right">{item.date}</TableCell>
                                                <TableCell className="text-right">¥{item.total}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    ))
                                ) : (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">
                                                No orders found
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TabsContent>
                    </CardContent>
                </Card>
            </Tabs>
        </div>
    );
}
