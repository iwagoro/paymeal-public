"use client";
import { Card, CardContent, CardHeader, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { H5, Mute } from "@/components/ui/typography";
export default function TicketCard({ ticket }: { ticket: any }) {
    return (
        <Card className="w-full flex justify-start items-center">
            <CardHeader className="w-full flex flex-row ">
                <div className="w-[80px] h-[80px] mr-4 bg-border rounded-md">
                    <img src={ticket.ticket.img_url} alt="food" className="rounded-md object-fit" />
                </div>
                <div className="flex-1 h-[80px] flex flex-col justify-start gap-1">
                    <Mute>{ticket.ticket.name}</Mute>
                    <H5>¥{ticket.ticket.price}</H5>
                    <Mute>quantity : {ticket.quantity}</Mute>
                </div>
            </CardHeader>
        </Card>
    );
}
