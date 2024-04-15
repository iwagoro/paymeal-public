"use client";

import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { getMenus, addToBag } from "@/lib/db-util";
import { AppContext } from "@/components/util/provider/app-provider";
import { toast } from "sonner";
import { menuProps, bagProps } from "@/lib/interface";

export const Menus = () => {
    const [menus, setMenus] = useState<menuProps[]>([]);
    const { user } = useContext(AppContext);
    const [menusId, setMenusId] = useState<string[]>([]);
    useEffect(() => {
        const fetchMenus = async () => {
            const menusData = (await getMenus()) as menuProps[][];
            setMenus(menusData[1] as menuProps[]);
            setMenusId(menusData[0] as any);
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
                            <CardDescription>¥{menu.price}</CardDescription>
                        </CardHeader>
                        <CardContent className="w-full">
                            <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
                                <Image src={menu.image} alt="Photo by Drew Beamer" fill className="rounded-md object-cover" />
                            </AspectRatio>
                        </CardContent>
                        <CardFooter className="">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => {
                                    toast("Added to bag", { description: "added" + menu.name + "to bag" });
                                    addToBag(user.email, menusId[index]);
                                }}
                            >
                                Add To Bag
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </TabsContent>
        </Tabs>
    );
};
