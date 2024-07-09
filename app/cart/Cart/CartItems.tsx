"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CartType } from "@/lib/types";
import { useContext } from "react";
import { toast } from "sonner";
import { AuthContext } from "@/provider/AuthProvider";
import useSWR, { mutate } from "swr";
import fetcher from "@/lib/fetcher";
import modifier from "@/lib/modifier";
import { Skeleton } from "@/components/ui/skeleton";
import ItemTable from "./ItemTable";

export default function CartItems() {
    const { user } = useContext(AuthContext);
    const { data: cart, error, isLoading } = useSWR<CartType>(user.token ? ["/cart", user.token] : null, ([url, token]) => fetcher(url, token as string));

    const add = async (ticketId: number) => {
        user.token &&
            cart &&
            modifier
                .post("/cart/", user.token, { ticket_id: ticketId })
                .then(() => {
                    toast.success("Added to cart");
                    mutate(["/cart", user.token]);
                })
                .catch(() => {
                    toast.error("Failed to add to cart");
                });
    };

    const sub = async (ticketId: number) => {
        user.token &&
            cart &&
            modifier
                .delete("/cart/", user.token, { ticket_id: ticketId })
                .then(() => {
                    toast.success("Deleted link");
                    mutate(["/cart", user.token]);
                })
                .catch(() => {
                    toast.error("Failed to delete link");
                });
    };

    if (isLoading || error) return <Skeleton className="h-80 w-full" />;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Tickets</CardTitle>
                {cart && <ItemTable cart={cart} add={add} sub={sub} />}
            </CardHeader>
        </Card>
    );
}
