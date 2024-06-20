import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { P } from "@/components/ui/typography";
import { TriangleAlert } from "lucide-react";
import { CartType } from "@/lib/types";
import useCart from "./useCart";

export default function CartSummary({ cart }: { cart: CartType }) {
    const { purchaseCart, deleteLink } = useCart();
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-full flex justify-between items-center">
                    <P>Total</P>
                    <P>{cart.items.length}</P>
                </div>
                <div className="w-full flex justify-between items-center">
                    <P>Total Price</P>
                    <P>¥{cart.total}</P>
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
