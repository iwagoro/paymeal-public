import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Plus, Minus } from "lucide-react";
import { CartType } from "@/lib/types";

interface CartTableProps {
    cart: CartType;
    add?: (ticketId: number) => void;
    sub?: (ticketId: number) => void;
}

export default function ItemTable({ cart, add, sub }: CartTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-left">Name</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.isArray(cart?.items) && cart?.items.length > 0 ? (
                    cart?.items.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.ticket_name}</TableCell>
                            <TableCell className="text-center">
                                <ToggleGroup type="single">
                                    {sub && (
                                        <ToggleGroupItem value="" asChild>
                                            <Button variant="ghost" onClick={() => sub && sub(item.ticket_id)}>
                                                <Minus size={14} />
                                            </Button>
                                        </ToggleGroupItem>
                                    )}
                                    <ToggleGroupItem value="">{item.quantity}</ToggleGroupItem>
                                    {add && (
                                        <ToggleGroupItem value="" asChild>
                                            <Button variant="ghost" onClick={() => add && add(item.ticket_id)}>
                                                <Plus size={14} />
                                            </Button>
                                        </ToggleGroupItem>
                                    )}
                                </ToggleGroup>
                            </TableCell>
                            <TableCell className="text-right">¥{item.ticket_price}</TableCell>
                            <TableCell className="text-right">¥{item.ticket_price * item.quantity}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">
                            No items found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
