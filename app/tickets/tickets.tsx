"use client";
import { TicketCard } from "./ticketCard";
import { useMenu } from "./useTickets";
import { CardContent } from "@/components/ui/card";

export const Tickets = () => {
    const { tickets, addToBag } = useMenu();

    return (
        <CardContent className="grid grid-cols-1 sm:grid-cols-2  gap-5">
            {Array.isArray(tickets) && tickets.map((menu, index) => <TicketCard key={index} ticket={menu} addToBag={addToBag} />)}
        </CardContent>
    );
};
