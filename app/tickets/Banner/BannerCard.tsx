"use client";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function BannerCard({ children }: { children: React.ReactNode }) {
    const plugin = useRef(Autoplay({ delay: 3000 }));
    return (
        <Carousel className="w-full" plugins={[plugin.current]} onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
            <CarouselContent className="w-full">
                {Array.isArray(children) &&
                    children.map((child, index) => (
                        <CarouselItem className="w-full" key={index}>
                            {child}
                        </CarouselItem>
                    ))}
            </CarouselContent>
        </Carousel>
    );
}
