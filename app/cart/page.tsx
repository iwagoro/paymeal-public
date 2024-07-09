import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CartOverview from "./Cart/CartOverview";
import CartItems from "./Cart/CartItems";
import CartSummary from "./Cart/CartSummary";

export default function Home() {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <Suspense fallback={<Skeleton className="h-40 w-full " />}>
                <CartOverview />
            </Suspense>
            <Suspense fallback={<Skeleton className="h-80 w-full " />}>
                <CartItems />
            </Suspense>
            <Suspense fallback={<Skeleton className="h-20 w-full " />}>
                <CartSummary />
            </Suspense>
        </div>
    );
}
