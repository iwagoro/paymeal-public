import { Suspense } from "react";
import LatestOrderCard from "./Orders/LatestOrderCard";
import OrdersCard from "./Orders/OrdersCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
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
