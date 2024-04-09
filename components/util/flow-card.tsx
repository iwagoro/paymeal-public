import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export const FlowCard1 = ({ children }: { children: React.ReactNode[] }) => {
    return (
        <div className=" w-full   flex justify-center">
            <Carousel className="w-full max-w-2xl">
                <CarouselContent>
                    {children.map((_, index) => (
                        <CarouselItem key={index} className="">
                            <Card className={`aspect-[2/1] max-w-2xl`}>
                                <CardContent className="flex h-full   w-full items-center justify-center p-6">{children[index]}</CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export const FlowCard2 = ({ children }: { children: React.ReactNode[] }) => {
    return (
        <div className=" w-full   flex justify-center">
            <Carousel className="w-full max-w-2xl">
                <CarouselContent>
                    {children.map((_, index) => (
                        <CarouselItem key={index} className="basis-1/2">
                            <Card className={`aspect-[2/3] max-w-2xl`}>
                                <CardContent className="flex h-full   w-full items-center justify-center p-6">{children[index]}</CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};
