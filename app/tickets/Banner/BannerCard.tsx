"use client";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function BannerCard({ children }: { children: React.ReactNode }) {
    const plugin = useRef(Autoplay({ delay: 3000 }));
    return (
        <Carousel plugins={[plugin.current]} className="w-full" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
            <CarouselContent>{Array.isArray(children) && children.map((child, index) => <CarouselItem key={index}>{child}</CarouselItem>)}</CarouselContent>
        </Carousel>
    );
}
