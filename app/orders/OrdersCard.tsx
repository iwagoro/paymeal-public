import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersTable from "./OrdersTable";
import useOrder from "./useOrder";
export default function OrdersCard() {
    const { orders, status, setStatus } = useOrder();
    const tabs = ["purchased", "ordered", "completed"];
    return (
        <Tabs defaultValue="purchased" className="w-full flex flex-col gap-5">
            <TabsList className="w-fit">
                {tabs.map((tab, index) => (
                    <TabsTrigger key={index} value={tab} onClick={() => setStatus(tab)}>
                        {tab}
                    </TabsTrigger>
                ))}
            </TabsList>
            <Card className="w-full">
                <CardHeader className="flex-row justify-between">
                    <CardTitle>All Orders</CardTitle>
                    <Badge className="w-fit">{status}</Badge>
                </CardHeader>
                <CardContent>
                    <OrdersTable orders={orders} />
                </CardContent>
            </Card>
        </Tabs>
    );
}
