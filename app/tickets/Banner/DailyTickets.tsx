"use client";
import { TicketType } from "@/lib/types";
import BannerCard from "./BannerCard";
import { H1, H3, List } from "@/components/ui/typography";
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import fetcher from "@/lib/fetcher";
import useSWRImmutable from "swr/immutable";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader } from "@/components/ui/card";

export default function DailyTickets() {
    const { user } = useContext(AuthContext);
    const { data: tickets, error, isLoading } = useSWRImmutable<TicketType[]>(user?.token ? ["/tickets/daily", user.token] : null, ([url, token]) => fetcher(url, token as string));

    if (isLoading) {
        return <Skeleton className="h-64 w-full " />;
    }

    if (error) {
        return <div className="text-red-500">エラーが発生しました。もう一度お試しください。</div>;
    }

    return (
        <div className="w-full">
            <H3 className="pl-[21px]">Daily Menus</H3>

            {Array.isArray(tickets) && tickets.length > 0 ? (
                <BannerCard>
                    {tickets.map((ticket, index) => (
                        <Card key={index} className="w-full flex items-center h-full gap-5">
                            <CardHeader className="w-full flex flex-row gap-5 items-center">
                                <div className="flex-[2]">
                                    <img src={ticket.img_url} alt={ticket.name} className="w-full" />
                                </div>
                                <div className="flex-[3] flex flex-col gap-5">
                                    <H1 className="text-4xl font-bold">{ticket.name}</H1>
                                    <List className="">{Array.isArray(ticket.contents) && ticket.contents.map((content, index) => <li key={index}>{content}</li>)}</List>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </BannerCard>
            ) : (
                <Card className="w-full flex items-center h-full gap-5">
                    <CardHeader className="w-full flex flex-row">
                        <div className="flex items-center h-full gap-5">
                            <H3 className="text-xl text-gray-400">本日のメニューはありません</H3>
                        </div>
                    </CardHeader>
                </Card>
            )}
        </div>
    );
}
