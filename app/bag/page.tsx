"use client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/components/util/provider/app-provider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { H2, Large, Mute } from "@/components/ui/typography";
import Image from "next/image";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { getUserBag, getRefDoc } from "@/lib/db-util";
import { DocumentReference } from "firebase/firestore";
import { MdOutlineClose } from "react-icons/md";
import { bagProps, menuProps } from "@/lib/interface";
import { createPayment } from "@/lib/paypay";
import { create } from "domain";
export default function Home() {
    const { user } = useContext(AppContext);
    const [bag, setBag] = useState<bagProps[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const fetchBag = async () => {
            if (user.email) {
                const userData = await getUserBag(user.email);
                if (userData !== undefined && userData.bag !== undefined) {
                    const newBag = await Promise.all(
                        userData.bag.map(async (item: DocumentReference) => {
                            const data = (await getRefDoc(item.path)) as menuProps;
                            return data;
                        })
                    );
                    setBag(newBag);
                }
            }
        };
        fetchBag();
    }, [user]);

    useEffect(() => {
        let total = 0;
        bag.map((item) => (total += item.price));
        setTotal(total);
    }, [bag]);

    async function getData() {
        const menus = bag.map((item) => item.name);
        createPayment(menus, total);
    }

    const deleteItem = (index: number) => {
        const newBag = [...bag];
        newBag.splice(index, 1);
        setBag(newBag);
    };

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <div>
                <H2>Your Shopping Bag</H2>
                <Mute>The application goes through two processes before ordering food. In process 1, you purchase your food from this app. Currently, only Paypay is supported as a payment method. In Process 2, you order the food from the Notification page, and the food will start cooking. The app will notify you when the food is ready.</Mute>
            </div>
            {bag.map((item, i) => (
                <Card key={i} className="w-full flex justify-start  items-center">
                    <div className="w-[100px] h-[100px] bg-border m-5 rounded-md">
                        <Image src={item.image} alt="food" width={100} height={100} className="rounded-md object-fit" />
                    </div>
                    <div className="flex-1">
                        <CardHeader className="pl-0">
                            <Large>{item.name}</Large>
                            <Mute>¥{item.price}</Mute>
                        </CardHeader>
                    </div>
                    <MdOutlineClose size={24} className="m-5" onClick={() => deleteItem(i)} />
                </Card>
            ))}

            <Separator />
            <div className="w-full flex justify-between items-center">
                <Large>{bag.length} items</Large>
                <Large>Total price : ¥{total}</Large>
            </div>
            <Sheet>
                <SheetTrigger className="w-full text-xl p-3 bg-background border border-border rounded-md font-semibold ">Buy now</SheetTrigger>
                <SheetContent side="bottom" className=" flex flex-col justify-start items-center gap-10">
                    <SheetHeader className="max-w-2xl w-full pb-5 border-b-[1px] border-border">
                        <SheetTitle className="flex justify-start items-center gap-4">Buy now</SheetTitle>
                        <SheetDescription className="text-left">Currently the only user is a test user. We plan to implement authentication with a Google account sometime in the future.</SheetDescription>
                    </SheetHeader>
                    <div className="max-w-2xl w-full bg-background">
                        <div className="w-full p-5  rounded flex flex-col gap-5">
                            <div className="flex  justify-between items-center">
                                <Large>Invoice</Large>
                                <Large>1</Large>
                            </div>
                            <Separator />
                            <div className="flex  justify-between items-center">
                                <Mute>Total</Mute>
                                <Mute>{total}</Mute>
                            </div>
                            <div className="flex  justify-between items-center">
                                <Mute>voucher</Mute>
                                <Mute>¥0</Mute>
                            </div>

                            <Separator />
                            <div className="flex  justify-between items-center">
                                <Large>Total</Large>
                                <Large>¥{total}</Large>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full py-8 text-xl font-medium mb-10" variant="outline" onClick={getData}>
                        Check out with
                        <Image width={32} height={32} src="/paypay-log.png" alt=""></Image>
                    </Button>
                </SheetContent>
            </Sheet>
        </div>
    );
}
