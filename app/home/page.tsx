import LatestOrderCard from "../orders/Orders/LatestOrderCard";
import IsOrderAvailableCard from "./IsOrderAvailableCard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PopularTickets from "@/app/tickets/Banner/PopularTickets";
import DailyTickets from "@/app/tickets/Banner/DailyTickets";
import IsPurchaseAvailableCard from "./IsPurchaseAvailableCard";
import Notifications from "../tickets/Banner/Notifications";

export default function Home() {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <Suspense fallback={<Skeleton className="h-64 w-full " />}>
                <IsOrderAvailableCard />
            </Suspense>
            <Suspense fallback={<Skeleton className="h-64 w-full " />}>
                <IsPurchaseAvailableCard />
            </Suspense>
            <Suspense fallback={<Skeleton className="h-64 w-full " />}>
                <Notifications />
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
