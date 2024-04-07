"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
export default function Menu() {
    return (
        <div className="w-full flex flex-col justify-start items-center gap-5">
            <div className="w-full  flex justify-center">
                <Carousel className="w-full max-w-md ">
                    <CarouselContent>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <CarouselItem key={index} className="basis-1/2">
                                <Card className="aspect-[3/4]">
                                    <CardContent className="flex h-full  w-full items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="w-full  flex justify-center">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    orientation="vertical"
                    className="w-full max-w-md"
                >
                    <CarouselContent className="-mt-1 h-[100px] ">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <CarouselItem key={index} className="pt-1 md:basis-1/2">
                                <Card>
                                    <CardContent className="flex h-full  w-full items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

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
        </div>
    );
}
