import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { toZonedTime, format } from "date-fns-tz";
import { auth } from "@/lib/auth";
import { getHandler, postHandler } from "@/lib/apiHandler";
import { OrderType } from "@/lib/types";

const getLatestOrder = async (token: string) => {
    const order = await getHandler({ method: "GET", endpoint: "/orders/latest", token: token, returnType: "object", revalidate: 10 });
    return order as OrderType;
};

const placeOrder = async (token: string, order_id: string) => {
    "use server";
    await postHandler({ endpoint: "/orders/", params: { order_id: order_id }, token: token });
};

export default async function LatestOrderCard() {
    const session = await auth();
    const order = session && ((await getLatestOrder(session?.idToken)) as OrderType);
    const today = format(toZonedTime(new Date(), "Asia/Tokyo"), "HH:mm");
    const isAvailable = today >= "11:00" && today <= "13:00";
    const isExpired = order?.purchase_date && order.purchase_date.toLocaleString() != today;

    return (
        <Card className="w-full">
            <CardHeader className="w-full flex flex-row justify-between">
                <div>
                    <CardTitle className="text-3xl">
                        Latest Order :<span className="text-4xl"> {order?.number ? `No.${order.number}` : ""}</span>
                    </CardTitle>
                    <CardDescription>ID : {order?.id}</CardDescription>
                    <CardDescription>Purchase Date : {order?.purchase_date && order?.purchase_date.toLocaleString()}</CardDescription>
                    <CardDescription>Order Date : {order?.order_date && order?.order_date.toLocaleString()}</CardDescription>
                </div>
                <Badge className="w-fit h-fit">{order?.status}</Badge>
            </CardHeader>

            <CardContent>
                {isExpired && (
                    <Alert variant="destructive">
                        <AlertTitle className="text-2xl font-semibold flex gap-2 items-center">
                            <TriangleAlert />
                            Oops..
                        </AlertTitle>
                        <AlertDescription>This ticket is expired. Ordering is not possible. Please buy another one.</AlertDescription>
                    </Alert>
                )}
            </CardContent>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">Ticket</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="text-right">amount</TableHead>
                            <TableHead className="text-right">total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(order?.items) &&
                            order.items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.ticket_name}</TableCell>
                                    <TableCell className="text-center">{item.quantity}</TableCell>
                                    <TableCell className="text-right">¥{item.ticket_price}</TableCell>
                                    <TableCell className="text-right">¥{item.ticket_price * item.quantity}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <form
                    action={async () => {
                        "use server";
                        session && order && placeOrder(session?.idToken, order?.id);
                    }}
                >
                    <Button disabled={order?.status !== "purchased" || isExpired || !isAvailable} className="w-full">
                        {order?.status === "purchased" && !isExpired ? "Order" : "Unable to order"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
