"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { useHorm } from "./useHorm";
import { Large } from "@/components/ui/typography";
export default function Home() {
    const { latestOrder, usage, user } = useHorm();
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <div className="w-full flex gap-5">
                <Card className="flex-[2]">
                    <CardHeader>
                        <CardTitle>Welcome Back!</CardTitle>
                        <CardDescription className="text-xs">USER : {user.email}</CardDescription>
                        <CardDescription className="text-xs">ID : {user.id}</CardDescription>
                    </CardHeader>
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <Large>This Month</Large>

                        <CardTitle>¥{usage}</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                </Card>
            </div>
            <Card className="w-full">
                <CardHeader className="w-full flex flex-row justify-between">
                    <div>
                        <CardTitle>Latest Order</CardTitle>
                        <CardDescription>ID : {latestOrder?.id}</CardDescription>
                    </div>
                    <Badge className="w-fit h-fit">{latestOrder?.status}</Badge>
                </CardHeader>
                <CardContent>
                    {latestOrder?.id ? (
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>View Details</AccordionTrigger>
                                <AccordionContent>
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
                            </AccordionItem>
                        </Accordion>
                    ) : (
                        <CardDescription>No orders found</CardDescription>
                    )}
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Popular Menus</CardTitle>
                    <CardDescription>Top 7 Menus</CardDescription>
                </CardHeader>
                <CardContent>
                    <Carousel className="w-full ">
                        <CarouselContent>
                            {Array.from({ length: 7 }).map((_, index) => (
                                <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className=" flex aspect-[1/2] items-center justify-center p-6">
                                                <span className="text-3xl font-semibold">{index + 1}</span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </CardContent>
            </Card>
        </div>
    );
}
