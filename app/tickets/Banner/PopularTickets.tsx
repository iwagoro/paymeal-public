"use client";
import { TicketType } from "@/lib/types";
import BannerCard from "./BannerCard";
import { H1, H2, H3, P, List } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import fetcher from "@/lib/fetcher";
import useSWRImmutable from "swr/immutable";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader } from "@/components/ui/card";

export default function PopularTickets() {
    const { user } = useContext(AuthContext);
    const { data: tickets, error, isLoading } = useSWRImmutable<TicketType[]>(user?.token ? ["/tickets/popular", user.token] : null, ([url, token]) => fetcher(url, token as string));

    if (isLoading || error) {
        return <Skeleton className="h-64 w-full " />;
    }

    return (
        <div>
            <H3 className="pl-[21px]">Popular Menus</H3>
            <BannerCard>
                {Array.isArray(tickets) &&
                    tickets.map((ticket, index) => (
                        <Card key={index} className="flex items-center h-full gap-5">
                            <CardHeader className="flex flex-row gap-5 justify-center">
                                <div className="flex-[2] flex  items-center">
                                    <img src={ticket.img_url} alt={ticket.name} className="w-full" />
                                </div>
                                <div className="flex-[4] flex flex-col  gap-5">
                                    <H3 className="text-xl text-gray-400">{index + 1}番人気</H3>
                                    <H2 className="text-4xl font-bold">{ticket.name}</H2>
                                    <P>{ticket.description}</P>
                                    <Badge className="w-fit">¥{ticket.price}</Badge>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
            </BannerCard>
        </div>
    );
}
