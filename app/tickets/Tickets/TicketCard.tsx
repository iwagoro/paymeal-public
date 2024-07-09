"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TicketType } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useContext } from "react";
import { toast } from "sonner";
import modifier from "@/lib/modifier";
import { AuthContext } from "@/provider/AuthProvider";

export default function TicketCard({ ticket, children }: { ticket: TicketType; children?: React.ReactNode }) {
    const { user } = useContext(AuthContext);

    const addToCart = async () => {
        user?.token &&
            ticket.id &&
            modifier
                .post("/cart/", user.token, { ticket_id: ticket.id })
                .then(() => {
                    toast.success("Added to cart");
                })
                .catch(() => {
                    toast.error("Failed to add to cart");
                });
    };

    return (
        <Card key={ticket.id} className="h-fit">
            <img src={ticket.img_url} alt={ticket.name} className="w-full aspect-video object-cover" />
            <CardHeader>
                <CardTitle>{ticket.name}</CardTitle>
                <CardDescription>{ticket.description}</CardDescription>
            </CardHeader>

            <CardFooter className="justify-between">
                <Badge>¥{ticket.price}</Badge>
                {children ? children : <Skeleton className="w-20 h-5" />}
            </CardFooter>

            <CardFooter className="w-full gap-5 justify-between">
                <form action={addToCart}>
                    <Button className=" w-full" variant="outline">
                        ADD
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
