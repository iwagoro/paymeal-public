import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, toZonedTime } from "date-fns-tz";

import LatestOrderCard from "../orders/LatestOrderCard";
import IsOrderAvailableCard from "./IsOrderAvailableCard";
import UsageCard from "./UsageCard";
import { getHandler } from "@/lib/apiHandler";
import { AuroraBackground } from "@/components/util/aurora";
import { auth } from "@/lib/auth";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PopularTickets from "@/app/tickets/PopularTickets";
import DailyTickets from "../tickets/DailyTickets";

const getUser = async (token: string) => {
    const user = await getHandler({ method: "GET", endpoint: "/user", token: token, returnType: "object" });
    return user;
};

export default async function Home() {
    const session = await auth();
    const user = session && ((await getUser(session?.idToken)) as any);
    const today = format(toZonedTime(new Date(), "Asia/Tokyo"), "HH:mm");
    const isAvailable = today >= "11:00" && today <= "13:00";
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <Card className="w-full">
                <AuroraBackground>
                    <CardHeader>
                        <div className="w-full flex justify-between items-center">
                            <CardTitle className="text-4xl text-primary">Welcome Back!</CardTitle>
                            <Badge>General Account</Badge>
                        </div>
                        <CardDescription className="text-xs">USER : {user?.email}</CardDescription>
                        <CardDescription className="text-xs">ID : {user?.id}</CardDescription>
                    </CardHeader>
                </AuroraBackground>
            </Card>
            <div className="w-full flex gap-5 h-fit">
                <IsOrderAvailableCard />

                <Suspense fallback={<Skeleton className="h-40 w-full " />}>
                    <UsageCard />
                </Suspense>
            </div>
            <Suspense fallback={<Skeleton className="h-40 w-full " />}>
                <LatestOrderCard />
            </Suspense>
            <Suspense fallback={<Skeleton className="h-64 w-full " />}>
                <PopularTickets />
            </Suspense>
            <Suspense fallback={<Skeleton className="h-64 w-full " />}>
                <DailyTickets />
            </Suspense>
        </div>
    );
}
