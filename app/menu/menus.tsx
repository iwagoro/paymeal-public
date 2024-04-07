"use client";

import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            <TabsContent value="set-meal" className="flex flex-wrap justify-between">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Card className="w-[calc(100%_/_2_-_40px)] m-5">
                        <CardHeader>
                            <CardTitle>Title</CardTitle>
                            <CardDescription>Description</CardDescription>
                        </CardHeader>
                        <CardContent className="w-full">
                            <AspectRatio ratio={16 / 9} className="bg-muted">
                                <Image src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80" alt="Photo by Drew Beamer" fill className="rounded-md object-cover" />
                            </AspectRatio>
                        </CardContent>
                    </Card>
                ))}
            </TabsContent>
        </Tabs>
    );
};
