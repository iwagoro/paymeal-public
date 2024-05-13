"use client";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { H5, Large, Mute, P } from "@/components/ui/typography";
import { MdOutlineClose } from "react-icons/md";
import { ticketProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export function BagItem({ item, add, sub, del }: { item: any; add: (id: number) => void; sub: (id: number) => void; del: (id: number) => void }) {
    return (
        <Card className="w-full ">
            <CardHeader className="w-full flex flex-row pb-0">
                <div className="w-[120px] h-[120px] mr-4 bg-border rounded-md">
                    <img src={item.ticket.img_url} alt="food" className="rounded-md object-fit" />
                </div>
                <div className="flex-1 h-[120px] flex flex-col justify-start gap-1">
                    <Mute>{item.ticket.name}</Mute>
                    <H5>¥{item.ticket.price}</H5>
                    <Mute>{item.ticket.stock} in stock</Mute>
                </div>
            </CardHeader>
            <CardFooter className="w-full flex">
                <div className="flex-1 flex gap-[20px] items-center">
                    <Button
                        variant="outline"
                        className="p-2"
                        onClick={() => {
                            sub(item.ticket.id);
                        }}
                    >
                        <AiOutlineMinus size={18} />
                    </Button>
                    <Large>{item.quantity}</Large>
                    <Button
                        variant="outline"
                        className="p-2"
                        onClick={() => {
                            add(item.ticket.id);
                        }}
                    >
                        <AiOutlinePlus size={18} />
                    </Button>
                </div>
                <Button
                    variant="outline"
                    className="p-2 flex-1 flex gap-2"
                    onClick={() => {
                        del(item.ticket.id);
                    }}
                >
                    <MdOutlineClose size={24} /> delete ticket
                </Button>
            </CardFooter>
        </Card>
    );
}
