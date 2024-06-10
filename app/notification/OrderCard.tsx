"use client";
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { place_order } from "@/lib/appUtils";
import { Button } from "@/components/ui/button";
import TicketCard from "./ticketCard";

export default function OrderCard({ user, order, orderId, orderDate, orderStatus }: { user: any; order: any; orderId: string; orderDate: string; orderStatus: string }) {
    let isAvailable = false;
    const date = new Date();
    if (date.getHours() > 7 && date.getHours() < 18) {
        isAvailable = true;
    }

    //! 商品を注文する
    const create_order = async (order_Id: string) => {
        if (!user) return;
        const data = await place_order(user.token, orderId);
        if (data) {
            alert("注文が完了しました");
        } else {
            alert("商品を注文する時にエラーが発生しました");
        }
    };

    return (
        <div className="w-full flex flex-col justify-start items-center gap-5">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex gap-5 w-full">
                        <CardTitle>Order detail</CardTitle>
                        <Badge>{orderStatus}</Badge>
                    </div>
                    <CardDescription>{orderId}</CardDescription>
                    <CardDescription>{orderDate}</CardDescription>
                </CardHeader>
                <CardContent>{Array.isArray(order) && order.map((item, index) => <TicketCard key={index} ticket={item} />)}</CardContent>
                <CardFooter>
                    {orderStatus === "ordered" || orderStatus === "completed " ? (
                        <Button className="w-full" variant="outline">
                            You have already placed an order
                        </Button>
                    ) : (
                        <Button variant={isAvailable ? "default" : "outline"} className="w-full" onClick={() => isAvailable && create_order(orderId)}>
                            Order Now
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
