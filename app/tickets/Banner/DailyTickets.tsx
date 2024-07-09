"use client";
import { TicketType } from "@/lib/types";
import BannerCard from "./BannerCard";
import { H1, H2, H3, List } from "@/components/ui/typography";
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import fetcher from "@/lib/fetcher";
import useSWRImmutable from "swr/immutable";
import { Skeleton } from "@/components/ui/skeleton";

export default function DailyTickets() {
    const { user } = useContext(AuthContext);
    const { data: tickets, error, isLoading } = useSWRImmutable<TicketType[]>(user.token ? ["/tickets/daily", user.token] : null, ([url, token]) => fetcher(url, token as string));

    if (isLoading || error) {
        return <Skeleton className="h-64 w-full " />;
    }

    return (
        <div>
            <H3 className="pl-[21px]">Daily Menus</H3>
            <BannerCard>
                {Array.isArray(tickets) &&
                    tickets.map((ticket, index) => (
                        <div key={index} className="flex items-center h-full gap-5">
                            <div className="flex-[2]">
                                <img src={ticket.img_url} alt={ticket.name} className="w-full" />
                            </div>
                            <div className="flex-[3] flex flex-col  gap-5">
                                <H1 className="text-4xl font-bold">{ticket.name}</H1>
                                <List className="">
                                    {Array.isArray(ticket.contents) &&
                                        ticket.contents.map((content, index) => {
                                            return <li key={index}>{content}</li>;
                                        })}
                                </List>
                            </div>
                        </div>
                    ))}
            </BannerCard>
        </div>
    );
}
