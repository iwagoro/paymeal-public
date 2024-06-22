"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { P } from "@/components/ui/typography";
import { TriangleAlert } from "lucide-react";
import { CartType } from "@/lib/types";
import { getHandler, postHandler, deleteHandler } from "@/lib/apiHandler";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const purchaseCart = async (token: string, order_id: string) => {
    getHandler({ method: "GET", endpoint: "/payment/", token: token, params: { order_id: order_id }, revalidate: 10, returnType: "string" })
        .then((data) => {
            window.location.href = data.url;
        })
        .catch(() => {
            toast.error("Failed to purchase cart");
        });
};

const deleteLink = async (token: string, order_id: string) => {
    deleteHandler({ endpoint: "/payment/", token: token, params: { order_id: order_id } }).then(
        () => {
            toast.success("Deleted link");
        },
        () => {
            toast.error("Failed to delete link");
        }
    );
};

export default function CartSummary({ cart }: { cart: CartType }) {
    const { data: session } = useSession();
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
                    <P>¥{cart?.total}</P>
                </div>
            </CardContent>
            <CardContent>
                <Button className="w-full" onClick={() => session && cart && purchaseCart(session?.idToken, cart?.id)}>
                    Checkout
                </Button>
            </CardContent>
            <CardContent className="flex flex-col gap-5 text-center">
                <CardDescription>If you want to cancel purchase, or payment doesn&#39;t work, please try delete link</CardDescription>
                <CardDescription className="text-primary flex justify-center gap-5 items-center">
                    <TriangleAlert />
                    If you finished payment, you can&#39;t cancel purchase
                </CardDescription>
                <Button className="w-full" variant="outline" onClick={() => session && cart && deleteLink(session?.idToken, cart?.id)}>
                    Delete Link
                </Button>
            </CardContent>
        </Card>
    );
}
