"use client";
import { useContext } from "react";
import { AppContext } from "@/components/util/provider/app-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { H2, H3, Large, Mute, P } from "@/components/util/typography";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { createQR } from "@/components/util/paypay";
import Image from "next/image";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";

export default function Home() {
    const { user } = useContext(AppContext);
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <div>
                <H2>Your Shopping Bag</H2>
                <Mute>The application goes through two processes before ordering food. In process 1, you purchase your food from this app. Currently, only Paypay is supported as a payment method. In Process 2, you order the food from the Notification page, and the food will start cooking. The app will notify you when the food is ready.</Mute>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
                <Card className="w-full flex justify-start  items-center">
                    <div className="w-[100px] h-[100px] bg-border m-5 rounded-md"></div>

                    <div className="flex-1">
                        <CardHeader className="pl-0">
                            <Large>Item Name</Large>
                            <Mute>Price</Mute>
                        </CardHeader>
                        <CardContent className="pl-0">
                            <div className="w-fit flex items-center gap-3">
                                <CiCircleMinus size={18} />
                                <p>1</p>
                                <CiCirclePlus size={18} />
                            </div>
                        </CardContent>
                    </div>
                </Card>
            ))}

            <Separator />
            <div className="w-full flex justify-between items-center">
                <Large>3 items</Large>
                <Large>Total price : ¥1500</Large>
            </div>
            <Sheet>
                <SheetTrigger className="w-full text-xl p-3 bg-background border border-border rounded-md font-semibold ">Buy now</SheetTrigger>
                <SheetContent side="bottom" className=" flex flex-col justify-start items-center gap-10">
                    <SheetHeader className="max-w-2xl w-full pb-5 border-b-[1px] border-border">
                        <SheetTitle className="flex justify-start items-center gap-4">Buy now</SheetTitle>
                        <SheetDescription className="text-left">Currently the only user is a test user. We plan to implement authentication with a Google account sometime in the future.</SheetDescription>
                    </SheetHeader>
                    <div className="max-w-2xl w-full">
                        <div className="w-full p-5 bg-gray-100 rounded flex flex-col gap-5">
                            <div className="flex  justify-between items-center">
                                <Large>Invoice</Large>
                                <Large>1</Large>
                            </div>
                            <Separator />
                            <div className="flex  justify-between items-center">
                                <Mute>Total</Mute>
                                <Mute>¥1500</Mute>
                            </div>
                            <div className="flex  justify-between items-center">
                                <Mute>voucher</Mute>
                                <Mute>¥0</Mute>
                            </div>

                            <Separator />
                            <div className="flex  justify-between items-center">
                                <Large>Total</Large>
                                <Large>¥1500</Large>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full py-8 text-xl font-medium mb-10" variant="outline" onClick={createQR}>
                        Check out with
                        <Image width={32} height={32} src="/paypay-log.png" alt=""></Image>
                    </Button>
                </SheetContent>
            </Sheet>
        </div>
    );
}
