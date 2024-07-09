"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { OrderType } from "@/lib/types";
import { useContext, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton";
import OrderDrawer from "../Drawer/OrderDrawer";

export default function OrdersTable({ status }: { status: string }) {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string>("");
    const {
        data: orders,
        error,
        isLoading,
    } = useSWR<OrderType[]>(user?.token && status ? ["/orders/all/", user.token, status] : null, ([url, token, status]) => fetcher(url, token as string, { status: status }));

    if (isLoading || error) return <Skeleton className="h-40 w-full" />;

    if (!orders) return <div>No orders found</div>;

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">No.</TableHead>
                        <TableHead className="text-left">ID</TableHead>
                        <TableHead className="text-right">status</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                        <TableHead className="text-right">price</TableHead>
                    </TableRow>
                </TableHeader>
                {orders.length > 0 ? (
                    orders.map((item, index) => (
                        <TableBody key={index}>
                            <TableRow>
                                <TableCell className="text-left">{item.number}</TableCell>
                                <TableCell className="text-left">
                                    <div
                                        className="text-left w-full text-primary underline cursor-pointer"
                                        onClick={() => {
                                            setIsOpen((prev) => !prev);
                                            setSelectedId(item.id);
                                        }}
                                    >
                                        {item.id}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge>{item.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right whitespace-nowrap">{item!.purchase_date.toLocaleString()}</TableCell>
                                <TableCell className="text-right">¥{item.total}</TableCell>
                            </TableRow>
                        </TableBody>
                    ))
                ) : (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No orders found
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>

            <OrderDrawer orderId={selectedId} isOpen={isOpen} onOpenChange={setIsOpen}></OrderDrawer>
        </>
    );
}
