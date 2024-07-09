import Tickets from "./Tickets/Tickets";
import PopularTickets from "./Banner/PopularTickets";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import DailyTickets from "./Banner/DailyTickets";

export default async function TicketsPage() {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <Suspense fallback={<Skeleton className="h-64 w-full " />}>
                <PopularTickets />
            </Suspense>
            <Suspense fallback={<Skeleton className="h-64 w-full " />}>
                <DailyTickets />
            </Suspense>
            <Suspense
                fallback={
                    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} className="h-80 w-full " />
                        ))}
                    </div>
                }
            >
                <Tickets />
            </Suspense>
        </div>
    );
}
