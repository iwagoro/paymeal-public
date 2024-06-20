"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TicketType } from "@/lib/types";
import useTicket from "./useTicket";

export default function TicketCard({ ticket, token }: { ticket: TicketType; token: string }) {
    const { addToCart } = useTicket();
    return (
        <Card key={ticket.id} className="h-fit">
            <img src={ticket.img_url} alt={ticket.name} className="w-full aspect-video object-cover" />
            <CardHeader>
                <CardTitle>{ticket.name}</CardTitle>
                <CardDescription>{ticket.description}</CardDescription>
            </CardHeader>

            <CardFooter className="justify-between">
                <Badge>¥{ticket.price}</Badge>
                <Badge variant="outline">{ticket.stock} in stock</Badge>
            </CardFooter>

            <CardFooter className="w-full gap-5 justify-between">
                <Button className=" w-full" variant="outline" onClick={() => addToCart(ticket.id)}>
                    ADD
                </Button>
            </CardFooter>
        </Card>
    );
}
