"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import useOrder from "./useOrder";
import Link from "next/link";

export default function Home() {
    const { selectedOrders, stateNames, createOrder, selectedState, setSelectedState } = useOrder();
    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-10">
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
