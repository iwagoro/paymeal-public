"use client";
import { H2, P } from "@/components/util/typography";
import { FlowCard2 } from "@/components/util/flow-card";
export default function Menu() {
    return (
        <div className="w-full flex flex-col justify-start items-center gap-5">
            <div className="w-full flex flex-col gap-5">
                <div>
                    <H2>Popular Menu</H2>
                    <P>Here are some of the most popular menus in terms of weekly sales</P>
                </div>
                <FlowCard2 amount={2}>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <span className="text-4xl font-semibold">{index + 1}</span>
                    ))}
                </FlowCard2>
            </div>
        </div>
    );
}
