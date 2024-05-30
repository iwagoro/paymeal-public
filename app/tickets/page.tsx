"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Ellipsis } from "lucide-react";
import useTicket from "./useTicket";

export default function Home() {
    const { tags, selectedTickets, selectedTag, setSelectedTag, addToCart } = useTicket();

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-fit">
                    {tags.map((tag, index) => (
                        <TabsTrigger key={index} value={tag.name} onClick={() => setSelectedTag(tag.name)}>
                            {tag.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value={selectedTag} className="w-full grid grid-cols-2 sm:grid-cols-3  gap-3 pt-3">
                    {selectedTickets.map((ticket, index) => (
                        <Card key={ticket.id} className="h-fit">
                            <img src={ticket.img_url} alt={ticket.name} className="w-full aspect-video object-cover" />
                            <CardHeader>
                                <CardTitle>{ticket.name}</CardTitle>
                                <CardDescription>{ticket.description}</CardDescription>
                            </CardHeader>

                            <CardFooter className="justify-between">
                                <Badge>¥{ticket.price}</Badge>
                                <Badge variant="outline">{ticket.stock} in stock</Badge>
                            </CardFooter>
                            <CardFooter className="w-full gap-5 justify-between">
                                <Button className=" w-fit" variant="outline" onClick={() => addToCart(ticket.id)}>
                                    <Plus className="mr-2" />
                                    ADD
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Ellipsis />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}
