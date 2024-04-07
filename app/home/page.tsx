"use client";
import { useContext } from "react";
import { AppContext } from "@/components/util/provider/app-provider";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
    const { user } = useContext(AppContext);
    return (
        <div className="w-full flex flex-col justify-start items-center gap-5">
            <div className="w-full  flex justify-center">
                <Carousel className="w-full max-w-md ">
                    <CarouselContent>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <CarouselItem key={index} className="basis-1/3">
                                <Card className="aspect-[9/16]">
                                    <CardContent className="flex h-full  w-full items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}
