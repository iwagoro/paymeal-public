"use client";
import { FlowCard2 } from "@/components/util/flow-card";
import { Tickets } from "./tickets";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
export default function Menu() {
    return (
        <div className="w-full flex flex-col justify-start items-center gap-5">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>人気のメニュー</CardTitle>
                    <CardDescription>Here are some of the most popular menus in terms of weekly sales</CardDescription>
                </CardHeader>

                <CardContent>
                    <FlowCard2>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <span key={index} className="text-4xl font-semibold">
                                {index + 1}
                            </span>
                        ))}
                    </FlowCard2>
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>メニュー</CardTitle>
                    <CardDescription>Here are some of menus</CardDescription>
                </CardHeader>
                <Tickets />
            </Card>
        </div>
    );
}
