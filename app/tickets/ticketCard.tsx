"use client";
import React from "react";
import { ticketProps } from "@/lib/types";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export const TicketCard = ({ ticket, addToBag }: { ticket: ticketProps; addToBag: (id: number) => void }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{ticket.name}</CardTitle>
                <CardDescription>{ticket.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
                    <img src={ticket.img_url} alt="Photo by Drew Beamer" className="rounded-md object-cover" />
                </AspectRatio>

                <CardDescription>¥{ticket.price}</CardDescription>
                <CardDescription>{ticket.stock} in stock</CardDescription>
            </CardContent>
            <CardFooter>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                        toast("Added to bag", {
                            description: "added" + ticket.name + "to bag",
                        });
                        addToBag(ticket.id);
                    }}
                >
                    Add To Bag
                </Button>
            </CardFooter>
        </Card>
    );
};
