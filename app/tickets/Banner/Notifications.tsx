"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { H1, H3 } from "@/components/ui/typography";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import BannerCard from "./BannerCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import fetcher from "@/lib/fetcher";

export default function Notifications() {
    const { user } = useContext(AuthContext);
    const { data: notifications, error, isLoading } = useSWRImmutable(user?.token ? ["/notifications", user.token] : null, ([url, token]) => fetcher(url, token as string));

    if (isLoading) {
        return <Skeleton className="h-64 w-full " />;
    }

    if (error) {
        return <div className="text-red-500">エラーが発生しました。もう一度お試しください。</div>;
    }

    return (
        <div className="w-full">
            <H3 className="pl-[21px]">Notifications</H3>

            {Array.isArray(notifications) && notifications.length > 0 ? (
                <BannerCard>
                    {notifications.map((notification, index) => (
                        <Card key={index} className="w-full">
                            <CardHeader className="w-full flex flex-row gap-5 items-center">
                                <CardTitle>{notification.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ReactMarkdown>{notification.body}</ReactMarkdown>
                            </CardContent>
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
