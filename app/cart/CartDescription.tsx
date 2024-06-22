"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CartType } from "@/lib/types";

export default function CartDescription({ cart }: { cart: CartType }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Summary</CardTitle>
                    </div>
                    <Badge className="w-fit">{cart?.status}</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <CardDescription>Total Items : {cart?.items && cart.items.length}</CardDescription>
                <CardDescription>Total Price : ¥{cart?.total}</CardDescription>
            </CardContent>
        </Card>
    );
}
