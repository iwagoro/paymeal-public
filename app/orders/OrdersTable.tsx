import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { OrderType } from "@/lib/types";
import Link from "next/link";

export default function OrdersTable({ orders }: { orders: OrderType[] }) {
    return (
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
                                <Link href={"/orders/" + item.id} className="text-primary underline">
                                    {item.id}
                                </Link>
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
    );
}
