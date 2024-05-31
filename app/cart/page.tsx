"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import useCart from "./useCart";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Plus, Minus, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
    const { cart, purchaseCart, deleteLink, increaseQuantity, decreaseQuantity } = useCart();

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <div className="w-full flex gap-5">
                <Card className="flex-[3]">
                    <CardHeader>
                        <CardTitle>Your Cart</CardTitle>
                        <CardDescription>ID : {cart?.id}</CardDescription>
                        <Badge className="w-fit">{cart?.status}</Badge>
                    </CardHeader>
                </Card>
                <Card className="flex-[2]">
                    <CardHeader>
                        <CardTitle>Summary</CardTitle>
                        <CardDescription>Total Items : {cart?.items.length}</CardDescription>
                        <CardDescription>Total Price : ¥{cart?.total}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">Name</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">amount</TableHead>
                                <TableHead className="text-right">total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cart && cart.items.length > 0 ? (
                                cart.items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.ticket.name}</TableCell>
                                        <TableCell className="text-center">
                                            <ToggleGroup type="single">
                                                <ToggleGroupItem value="" asChild>
                                                    <Button variant="ghost" onClick={() => decreaseQuantity(item.ticket.id)}>
                                                        <Minus size={14} />
                                                    </Button>
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="">{item.quantity}</ToggleGroupItem>
                                                <ToggleGroupItem value="" asChild>
                                                    <Button variant="ghost" onClick={() => increaseQuantity(item.ticket.id)}>
                                                        <Plus size={14} />
                                                    </Button>
                                                </ToggleGroupItem>
                                            </ToggleGroup>
                                        </TableCell>
                                        <TableCell className="text-right">¥{item.ticket.price}</TableCell>
                                        <TableCell className="text-right">¥{item.ticket.price * item.quantity}</TableCell>
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
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">Name</TableHead>
                                <TableHead className="text-right">Quantity</TableHead>
                                <TableHead className="text-right">amount</TableHead>
                                <TableHead className="text-right">total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cart &&
                                cart.items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.ticket.name}</TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                        <TableCell className="text-right">¥{item.ticket.price}</TableCell>
                                        <TableCell className="text-right">¥{item.ticket.price * item.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            <TableRow>
                                <TableCell>total</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell className="text-right">¥{cart?.total}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
                <CardContent>
                    <Button className="w-full" onClick={purchaseCart}>
                        Checkout
                    </Button>
                </CardContent>
                <CardContent className="flex flex-col gap-5 text-center">
                    <CardDescription>If you want to cancel purchase,or payment doesn&#39;t work please try delete link</CardDescription>
                    <CardDescription className="text-primary flex justify-center gap-5 items-center">
                        <TriangleAlert />
                        If you finished payment, you can&#39;t cancel purchase
                    </CardDescription>
                    <Button className="w-full" variant="outline" onClick={deleteLink}>
                        Delete Link
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
