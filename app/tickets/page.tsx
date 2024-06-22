import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicketCard from "./TicketCard";
import { TagType, TicketStockType, TicketType } from "@/lib/types";
import { getHandler } from "@/lib/apiHandler";
import { Suspense } from "react";
import StockBadges from "./StockBadge";
const getTags = async () => {
    const data = await getHandler({ method: "GET", endpoint: "/tags", returnType: "array" });
    return data;
};

const getTickets = async () => {
    const data = await getHandler({ method: "GET", endpoint: "/tickets", returnType: "array" });
    return data;
};

export default async function TicketsPage() {
    const tags = (await getTags()) as TagType[];
    const tickets = (await getTickets()) as TicketType[];

    const tagRelations = tags.map((tag) => {
        return {
            tag: tag.name,
            tickets: [] as number[],
        };
    });

    tickets.forEach((ticket, index) => {
        ticket.tags.forEach((tag) => {
            tagRelations.forEach((tagRelation) => {
                if (tagRelation.tag === tag) {
                    tagRelation.tickets.push(index);
                }
            });
        });
    });

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <Tabs defaultValue="popular">
                <TabsList>
                    {tags.map((tag, index) => (
                        <TabsTrigger key={index} value={tag.name}>
                            {tag.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {tags.map((tag, index) => (
                    <TabsContent key={index} value={tag.name} className="w-full grid grid-cols-3 gap-5">
                        {tagRelations[index].tickets.map((ticketIndex, index) => (
                            <TicketCard key={tickets[ticketIndex].id} ticket={tickets[ticketIndex]}>
                                <Suspense fallback={<StockBadges id={tickets[ticketIndex].id} />}>
                                    <StockBadges id={tickets[ticketIndex].id} />
                                </Suspense>
                            </TicketCard>
                        ))}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
