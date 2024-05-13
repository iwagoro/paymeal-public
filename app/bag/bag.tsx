"use client";
import { useShoppingBag } from "./useShoppingBag"; // 新しいカスタムフック
import { BagItem } from "./bagItem"; // 新しいコンポーネント
import { CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Bag() {
    const { cart, add, sub, del } = useShoppingBag(); // カスタムフックを使用

    return (
        <CardContent className="flex flex-col gap-5">
            <Separator orientation="horizontal" className="w-full" />
            <CardTitle>Tickets</CardTitle>
            {Array.isArray(cart) && cart.map((item, index) => <BagItem key={index} item={item} add={add} sub={sub} del={del} />)}
            {Array.isArray(cart) && cart.length === 0 && <div className="h-20  flex items-center justify-center">No items in your bag</div>}
        </CardContent>
    );
}
