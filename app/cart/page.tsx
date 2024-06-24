import CartItemsTable from "./CartItemsTable";
import { CartType } from "@/lib/types";
import { auth } from "@/lib/auth";
import { getHandler } from "@/lib/apiHandler";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const getCart = async (token: string) => {
    const cart = await getHandler({ method: "GET", endpoint: "/cart", token: token, revalidate: 1, returnType: "object" });
    return cart;
};

export default async function Home() {
    const session = await auth();
    const cart = (await (session && getCart(session?.idToken))) as CartType;
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <Suspense
                fallback={
                    <div className="w-full flex flex-col gap-5">
                        <Skeleton className="h-40 w-full " />
                        <Skeleton className="h-44 w-full " />
                        <Skeleton className="h-80 w-full " />
                    </div>
                }
            >
                <CartItemsTable preCart={cart} />
            </Suspense>
        </div>
    );
}
