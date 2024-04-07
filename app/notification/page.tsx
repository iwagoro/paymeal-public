"use client";
import { useContext } from "react";
import { AppContext } from "@/components/util/provider/app-provider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Large, P } from "@/components/util/typography";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { FaRegCircleCheck, FaExclamation } from "react-icons/fa6";

export default function Home() {
    const { user } = useContext(AppContext);
    return (
        <div className="w-full flex flex-col justify-start items-center gap-5">
            <div className="w-full flex justify-start items-end gap-4">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Card>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className=" border-b-0">
                            <CardHeader className="p-4">
                                <AccordionTrigger>
                                    <div className="flex items-center gap-3">
                                        <FaExclamation className="text-red-500" />
                                        Available for order now
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <P>You currently have an unordered items. You can place your order from now until 13:00</P>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="item-1" className=" border-b-0">
                                            <CardHeader>
                                                <AccordionTrigger>View detail</AccordionTrigger>
                                                <AccordionContent>
                                                    <Table>
                                                        <TableCaption>A list of your recent invoices.</TableCaption>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead className="w-[100px]">Invoice</TableHead>
                                                                <TableHead>Status</TableHead>
                                                                <TableHead>Method</TableHead>
                                                                <TableHead className="text-right">Amount</TableHead>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableHead className="w-[100px]">Invoice</TableHead>
                                                                <TableHead>Status</TableHead>
                                                                <TableHead>Method</TableHead>
                                                                <TableHead className="text-right">Amount</TableHead>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableHead className="w-[100px]">Invoice</TableHead>
                                                                <TableHead>Status</TableHead>
                                                                <TableHead>Method</TableHead>
                                                                <TableHead className="text-right">Amount</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell className="font-medium">INV001</TableCell>
                                                                <TableCell>Paid</TableCell>
                                                                <TableCell>Credit Card</TableCell>
                                                                <TableCell className="text-right">$250.00</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </AccordionContent>
                                            </CardHeader>
                                        </AccordionItem>
                                    </Accordion>
                                    <Button variant="outline">Order Now</Button>
                                </AccordionContent>
                            </CardHeader>
                        </AccordionItem>
                    </Accordion>
                </Card>
            </div>

            <div className="w-full flex justify-end items-end gap-4">
                <Card>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className=" border-b-0">
                            <CardHeader className="p-4">
                                <AccordionTrigger>
                                    <div className="flex items-center gap-3">
                                        <FaRegCircleCheck className="text-green-500" />
                                        You ordered #dfj3239
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <P>You placed your order on 2024/11/23/11 at 11:30 Estimated completion time is around 2024/11/23/11:40 We will notify you on this page as soon as it is completed, so please sit down and wait.</P>
                                </AccordionContent>
                            </CardHeader>
                        </AccordionItem>
                    </Accordion>
                </Card>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>

            <Separator className="flex justify-center items-center">
                <div className="bg-background px-4 text-border">Now</div>
            </Separator>

            <div className="w-full flex justify-start items-end gap-4">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Card>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className=" border-b-0">
                            <CardHeader className="p-4">
                                <AccordionTrigger>
                                    <div className="flex items-center gap-3">
                                        <FaExclamation className="text-red-500" />
                                        The dish is now ready!
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <P>The food is ready, please come to the receiving door to take a picture. At that time, please present the QR code with your order number to the waiter.</P>
                                    <Button variant="outline">Show QRCode</Button>
                                </AccordionContent>
                            </CardHeader>
                        </AccordionItem>
                    </Accordion>
                </Card>
            </div>
        </div>
    );
}
