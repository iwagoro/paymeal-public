"use client";
import { H2, P, Mute } from "@/components/util/typography";
import { FlowCard2 } from "@/components/util/flow-card";
import { Menus } from "./menus";
export default function Menu() {
    return (
        <div className="w-full flex flex-col justify-start items-center gap-5">
            <div className="w-full flex flex-col gap-5">
                <div>
                    <H2>Popular Menu</H2>
                    <Mute>Here are some of the most popular menus in terms of weekly sales</Mute>
                </div>

                <FlowCard2>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <span className="text-4xl font-semibold">{index + 1}</span>
                    ))}
                </FlowCard2>
            </div>
            <div className="w-full flex flex-col gap-5">
                <div>
                    <H2>Menus</H2>
                    <Mute>Here are some of menus</Mute>
                </div>
                <Menus />
            </div>
        </div>
    );
}
