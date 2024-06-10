"use client";
import { useShoppingBag } from "./useShoppingBag"; // 新しいカスタムフック
import { BagItem } from "./bagItem"; // 新しいコンポーネント
import { Card, CardTitle, CardDescription, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Bag from "./bag";
export default function Home() {
    const { cart, cartStatus, cartId, total, getPayment } = useShoppingBag(); // カスタムフックを使用

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-row items-center gap-4">
                    <CardTitle>Your Shopping Bag</CardTitle>
                    {cartStatus !== "" && <Badge>{cartStatus}</Badge>}
                </div>

                <CardDescription>ID : {cartId}</CardDescription>
            </CardHeader>
            <Bag />
            <CardContent className="flex flex-col gap-5">
                <Separator orientation="horizontal" className="w-full" />
                <div className="flex justify-between items-center">
                    <CardTitle>合計</CardTitle>
                    <CardTitle>{total}円</CardTitle>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" variant={Array.isArray(cart) && cart.length === 0 ? "outline" : "default"} onClick={() => cart.length !== 0 && getPayment()}>
                    支払いを行う
                </Button>
            </CardFooter>
        </Card>
    );
}
