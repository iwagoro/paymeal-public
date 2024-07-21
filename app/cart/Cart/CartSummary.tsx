"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { P } from "@/components/ui/typography";
import { TriangleAlert } from "lucide-react";
import { CartType } from "@/lib/types";
import { useContext } from "react";
import { toast } from "sonner";
import { AuthContext } from "@/provider/AuthProvider";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import modifier from "@/lib/modifier";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartSummary() {
    const { user } = useContext(AuthContext);
    const { data: cart, error, isLoading } = useSWR<CartType>(user?.token ? ["/cart", user.token] : null, ([url, token]) => fetcher(url, token as string));

    const purchaseCart = async () => {
        user?.token &&
            cart?.id &&
            modifier
                .post("/payment/", user.token, { order_id: cart.id })
                .then((url: string) => {
                    if (!url) throw new Error("Failed to get payment link");
                    window.open(url, "_blank");
                })
                .catch(() => {
                    toast.error("Failed to add to cart");
                });
    };

    const deleteLink = async () => {
        user?.token &&
            cart?.id &&
            modifier
                .delete("/payment/", user.token, { order_id: cart.id })
                .then(() => {
                    toast.success("Deleted link");
                })
                .catch(() => {
                    toast.error("Failed to delete link");
                });
    };

    if (isLoading || error) return <Skeleton className="h-40 w-full" />;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-full flex justify-between items-center">
                    <P>Total</P>
                    <P>{cart?.items && cart.items.length}</P>
                </div>
                <div className="w-full flex justify-between items-center">
                    <P>Total Price</P>
                    <P>{cart?.total ? "¥" + cart.total : "0 "}</P>
                </div>
            </CardContent>
            <CardContent>
                <Button className="w-full" onClick={purchaseCart}>
                    Checkout
                </Button>
            </CardContent>
            <CardContent className="flex flex-col gap-5 text-center">
                <CardDescription>If you want to cancel purchase, or payment doesn&#39;t work, please try delete link</CardDescription>
                <CardDescription className="text-primary flex justify-center gap-5 items-center">
                    <TriangleAlert />
                    If you finished payment, you can&#39;t cancel purchase
                </CardDescription>
                <Button className="w-full" variant="outline" onClick={deleteLink}>
                    Delete Link
                </Button>
            </CardContent>
        </Card>
    );
}
