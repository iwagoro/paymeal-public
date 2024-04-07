"use client";

import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List } from "@/components/util/typography";

export const Menus = () => {
    return (
        <Tabs defaultValue="set-meal" className="w-full">
            <TabsList className="flex justify-start w-full  overflow-x-scroll ">
                <TabsTrigger value="set-meal">set meal</TabsTrigger>
                <TabsTrigger value="daily">daily</TabsTrigger>
                <TabsTrigger value="bowl">bowl</TabsTrigger>
                <TabsTrigger value="pasta">pasta</TabsTrigger>
                <TabsTrigger value="rice">rice</TabsTrigger>
                <TabsTrigger value="sub">sub</TabsTrigger>
            </TabsList>
            <TabsContent value="set-meal" className="grid grid-cols-1 sm:grid-cols-2  gap-5">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Card>
                        <CardHeader>
                            <CardTitle>Title</CardTitle>
                            <CardDescription>
                                <List>
                                    <li>description</li>
                                    <li>description</li>
                                    <li>description</li>
                                </List>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="w-full">
                            <AspectRatio ratio={16 / 9} className="bg-muted">
                                <Image src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80" alt="Photo by Drew Beamer" fill className="rounded-md object-cover" />
                            </AspectRatio>
                        </CardContent>
                        <CardFooter className="">Price</CardFooter>
                    </Card>
                ))}
            </TabsContent>
        </Tabs>
    );
};
