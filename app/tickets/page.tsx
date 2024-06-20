"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import useTickets from "./useTicket";
import TicketCard from "./TicketCard";
export default function Home() {
    const { user, tickets, tags, selectedTag, setSelectedTag } = useTickets();

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <Tabs defaultValue="popular">
                <TabsList>
                    {tags.map((tag, index) => (
                        <TabsTrigger key={index} value={tag.name} onClick={() => setSelectedTag(tag)}>
                            {tag.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value={selectedTag.name || "popular"}>
                    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
                        {tickets.map((ticket, index) => Array.isArray(ticket.tags) && ticket.tags.includes(selectedTag.name) && <TicketCard key={index} ticket={ticket} token={user.token} />)}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
