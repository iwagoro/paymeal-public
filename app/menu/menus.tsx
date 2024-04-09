"use client";

import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List } from "@/components/util/typography";

import { useEffect, useState } from "react";
import { getMenus } from "@/components/util/db-util";

interface menuProps {
    name: string;
    price: number;
    stock: number;
    image: string;
    contents: string[];
}

export const Menus = () => {
    const [menus, setMenus] = useState<menuProps[]>([]);
    useEffect(() => {
        const fetchMenus = async () => {
            const menu = (await getMenus()) as menuProps[];
            setMenus(menu);
        };
        fetchMenus();
    }, []);

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
                {menus.map((menu, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{menu.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="w-full">
                            <AspectRatio ratio={16 / 9} className="bg-muted">
                                <Image src={menu.image} alt="Photo by Drew Beamer" fill className="rounded-md object-cover" />
                            </AspectRatio>
                        </CardContent>
                        <CardFooter className="">¥{menu.price}</CardFooter>
                    </Card>
                ))}
            </TabsContent>
        </Tabs>
    );
};
