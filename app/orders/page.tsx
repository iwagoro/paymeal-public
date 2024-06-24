import { Suspense } from "react";
import LatestOrderCard from "./LatestOrderCard";
import OrdersCard from "./OrdersCard";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Home() {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <Suspense fallback={<Skeleton className="h-80 w-full " />}>
                <LatestOrderCard />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-80 w-full " />}>
                <OrdersCard />
            </Suspense>
        </div>
    );
}
