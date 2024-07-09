"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicketCard from "./TicketCard";
import { TagType, TicketType } from "@/lib/types";
import fetcher from "@/lib/fetcher";
import { Suspense, useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import useSWRImmutable from "swr/immutable";
import StockBadges from "./StockBadge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Tickets() {
    const { user } = useContext(AuthContext);
    const { data: tags, error: tagsError, isLoading: tagsLoading } = useSWRImmutable<TagType[]>(user.token ? ["/tags", user.token] : null, ([url, token]) => fetcher(url, token as string));
    const {
        data: tickets,
        error: ticketsError,
        isLoading: ticketsLoading,
    } = useSWRImmutable<TicketType[]>(user.token ? ["/tickets", user.token] : null, ([url, token]) => fetcher(url, token as string));

    if (tagsLoading || ticketsLoading || tagsError || ticketsError) {
        return <TicketSkeltons />;
    }

    if (!Array.isArray(tags) || !Array.isArray(tickets)) {
        return null;
    }

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
        <Tabs defaultValue="popular">
            <TabsList>
                {tags.map((tag, index) => (
                    <TabsTrigger key={index} value={tag.name}>
                        {tag.name}
                    </TabsTrigger>
                ))}
            </TabsList>

            {tags.map((tag, index) => (
                <TabsContent key={index} value={tag.name} className="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
                    {tagRelations[index].tickets.map((ticketIndex) => (
                        <TicketCard key={tickets[ticketIndex].id} ticket={tickets[ticketIndex]}>
                            <Suspense fallback={<StockBadges id={tickets[ticketIndex].id} />}>
                                <StockBadges id={tickets[ticketIndex].id} />
                            </Suspense>
                        </TicketCard>
                    ))}
                </TabsContent>
            ))}
        </Tabs>
    );
}

const TicketSkeltons = () => {
    return (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
            {Array(6)
                .fill(0)
                .map((_, index) => (
                    <Skeleton key={index} className="h-64 w-full" />
                ))}
        </div>
    );
};
