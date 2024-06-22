import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersTable from "./OrdersTable";
import { getHandler } from "@/lib/apiHandler";
import { OrderType } from "@/lib/types";
import { auth } from "@/lib/auth";
import PastOrdersTable from "./pastOrdersTable";

const getOrders = async (token: string, status: string) => {
    const orders = await getHandler({ method: "GET", endpoint: "/orders/all/", params: { status: status }, token: token, revalidate: 10, returnType: "array" });
    return orders;
};

export default async function OrdersCard() {
    const tabs = ["purchased", "ordered", "completed"];
    const session = await auth();
    const purchasedOrders = session && ((await getOrders(session?.idToken, tabs[0])) as OrderType[]);
    const orderedOrders = session && ((await getOrders(session?.idToken, tabs[1])) as OrderType[]);

    return (
        <Tabs defaultValue="purchased" className="w-full flex flex-col gap-5">
            <TabsList className="w-fit">
                {tabs.map((tab, index) => (
                    <TabsTrigger key={index} value={tab}>
                        {tab}
                    </TabsTrigger>
                ))}
            </TabsList>
            <Card>
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    {tabs.map((tab, index) => (
                        <TabsContent value={tab} key={index}>
                            {tab === "purchased" && purchasedOrders && <OrdersTable orders={purchasedOrders} />}
                            {tab === "ordered" && orderedOrders && <OrdersTable orders={orderedOrders} />}
                            {tab === "completed" && <PastOrdersTable />}
                        </TabsContent>
                    ))}
                </CardContent>
            </Card>
        </Tabs>
    );
}
