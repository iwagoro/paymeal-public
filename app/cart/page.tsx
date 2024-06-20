"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import CartDescription from "./CartDescription";
import CartItemsTable from "./CartItemsTable";
import CartSummary from "./CartSummary";
import useCart from "./useCart";

export default function Home() {
    const { cart, addToCart, removeFromCart } = useCart();

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <CartDescription cart={cart} />

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Tickets</CardTitle>
                    <CartItemsTable cart={cart} add={addToCart} sub={removeFromCart} />
                </CardHeader>
            </Card>
            <CartSummary cart={cart} />
        </div>
    );
}
