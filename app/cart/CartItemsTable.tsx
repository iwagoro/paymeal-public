"use client";

import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { CartType } from "@/lib/types";
import { useEffect, useState } from "react";
import { deleteHandler, postHandler, patchHandler } from "@/lib/apiHandler";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import CartSummary from "./CartSummary";
import CartDescription from "./CartDescription";

export default function CartItemsTable({ preCart }: { preCart: CartType }) {
    const [cart, setCart] = useState<CartType>(preCart);
    const { data: session } = useSession();

    useEffect(() => {
        if (cart?.status == "processing") {
            //５秒ごとに確認
            const interval = setInterval(() => {
                confirm();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [cart]);

    const confirm = async () => {
        session &&
            patchHandler({ endpoint: "/payment/", token: session.idToken, params: { order_id: cart.id } })
                .then((data) => {
                    toast("Payment completed");
                })
                .catch(() => {
                    toast.error("Failed to purchase cart");
                });
    };

    const add = async (ticketId: number) => {
        session &&
            postHandler({ endpoint: "/cart/", token: session.idToken, params: { ticket_id: ticketId } })
                .then(() => {
                    setCart({ ...cart, items: cart.items.map((item) => (item.ticket_id === ticketId ? { ...item, quantity: item.quantity + 1 } : item)) });
                })
                .catch(() => {
                    toast.error("Failed to remove from cart");
                });
    };
    const sub = async (ticketId: number) => {
        session &&
            deleteHandler({ endpoint: "/cart/", token: session.idToken, params: { ticket_id: ticketId } })
                .then(() => {
                    setCart({ ...cart, items: cart.items.map((item) => (item.ticket_id === ticketId ? { ...item, quantity: item.quantity - 1 } : item)) });
                })
                .catch(() => {
                    toast.error("Failed to remove from cart");
                });
    };

    return (
        <>
            <CartDescription cart={cart} />
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Tickets</CardTitle>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">Name</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.isArray(cart?.items) && cart?.items.length > 0 ? (
                                cart?.items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.ticket_name}</TableCell>
                                        <TableCell className="text-center">
                                            <ToggleGroup type="single">
                                                <ToggleGroupItem value="" asChild>
                                                    <Button variant="ghost" onClick={() => sub(item.ticket_id)}>
                                                        <Minus size={14} />
                                                    </Button>
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="">{item.quantity}</ToggleGroupItem>
                                                <ToggleGroupItem value="" asChild>
                                                    <Button variant="ghost" onClick={() => add(item.ticket_id)}>
                                                        <Plus size={14} />
                                                    </Button>
                                                </ToggleGroupItem>
                                            </ToggleGroup>
                                        </TableCell>
                                        <TableCell className="text-right">¥{item.ticket_price}</TableCell>
                                        <TableCell className="text-right">¥{item.ticket_price * item.quantity}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        No items found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardHeader>
            </Card>
            <CartSummary cart={cart} />
        </>
    );
}
