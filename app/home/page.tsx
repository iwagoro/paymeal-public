"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Badge } from "@/components/ui/badge";
import { useHorm } from "./useHorm";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Large } from "@/components/ui/typography";

export default function Home() {
    const { latestOrder, usage, user, isAvailable, lastUsage } = useHorm();
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <Card className="w-full">
                <CardHeader>
                    <div className="w-full flex justify-between items-center">
                        <CardTitle className="text-4xl">Welcome Back!</CardTitle>
                        <Badge>General Account</Badge>
                    </div>
                    <CardDescription className="text-xs">USER : {user.email}</CardDescription>
                    <CardDescription className="text-xs">ID : {user.id}</CardDescription>
                </CardHeader>
            </Card>
            <div className="w-full flex gap-5 h-fit">
                <Card className="flex-[3]">
                    <CardHeader>
                        <CardTitle>
                            <span className="text-primary text-4xl">{isAvailable ? "Una" : "A"}vailable</span>
                            <br /> to order
                        </CardTitle>
                        <CardDescription>Order is available between 11:00 and 13:00</CardDescription>
                    </CardHeader>
                </Card>
                <Card className="flex-[2] h-fit">
                    <CardHeader>
                        <CardDescription>This Week</CardDescription>

                        <CardTitle className="text-primary text-4xl">¥{usage}</CardTitle>
                        <CardDescription>
                            {usage < lastUsage ? "-" : "+"}¥{Math.abs(usage - lastUsage)} from last month{" "}
                        </CardDescription>

                        <Progress className="h-2" value={lastUsage !== 0 ? (usage / lastUsage) * 100 : usage} />
                    </CardHeader>
                </Card>
            </div>
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
                            </AccordionItem>
                        </Accordion>
                    ) : (
                        <CardDescription>No orders found</CardDescription>
                    )}
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-4xl">Daily Menus</CardTitle>
                    <CardDescription>Top 7 Menus</CardDescription>
                </CardHeader>
                <CardContent>
                    <Carousel className="w-full ">
                        <CarouselContent>
                            {Array.from({ length: 7 }).map((_, index) => (
                                <CarouselItem key={index}>
                                    <Skeleton className=" flex aspect-video items-center justify-center p-6"></Skeleton>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-4xl">Popular Menus</CardTitle>
                    <CardDescription>Top 7 Menus</CardDescription>
                </CardHeader>
                <CardContent>
                    <Carousel className="w-full ">
                        <CarouselContent>
                            {Array.from({ length: 7 }).map((_, index) => (
                                <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                                    <Skeleton className=" flex aspect-[1/2] items-center justify-center p-6"></Skeleton>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </CardContent>
            </Card>
        </div>
    );
}
