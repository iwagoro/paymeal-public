import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import CartDescription from "./CartDescription";
import CartItemsTable from "./CartItemsTable";
import { CartType } from "@/lib/types";
import { auth } from "@/lib/auth";
import { getHandler, postHandler, deleteHandler } from "@/lib/apiHandler";

const getCart = async (token: string) => {
    const cart = await getHandler({ method: "GET", endpoint: "/cart", token: token, revalidate: 10, returnType: "object" });
    return cart;
};

export default async function Home() {
    const session = await auth();
    const cart = (await (session && getCart(session?.idToken))) as CartType;
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <CartItemsTable preCart={cart} />
        </div>
    );
}
