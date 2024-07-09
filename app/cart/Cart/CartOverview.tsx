"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CartType } from "@/lib/types";
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import useSWR, { mutate } from "swr";
import fetcher from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function CartOverview() {
    const { user } = useContext(AuthContext);
    const { data: cart, error, isLoading } = useSWR<CartType>(user.token ? ["/cart", user.token] : null, ([url, token]) => fetcher(url, token as string));

    const {
        data: purchaseState,
        error: errorPurchaseState,
        isLoading: isLoadingPurchaseState,
    } = useSWR(user.token && cart?.status === "processing" ? ["/payment", user.token] : null, ([url, token]) => fetcher(url, token as string, { order_id: cart?.id }));

    if (errorPurchaseState) toast.error("Failed to get purchase state");
    else if (purchaseState) {
        toast.success("Purchase state updated");
        mutate(["/cart", user.token]);
    }

    if (isLoading || error) return <Skeleton className="h-40 w-full" />;

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Summary</CardTitle>
                    </div>
                    <Badge className="w-fit">{cart?.status ? cart.status : "not found"}</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <CardDescription>Total Items : {cart?.items && cart.items.length}</CardDescription>
                <CardDescription>Total Price : ¥{cart?.total}</CardDescription>
            </CardContent>
        </Card>
    );
}
